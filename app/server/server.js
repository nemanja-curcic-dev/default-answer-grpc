const grpc = require('grpc');
const {createGetResponse, createSetResponse} = require('./helpers');
const logger = require('debug-logger')('default-answer-server');
const util = require('util');
const {connection} = require('../db/db');
const {DefaultAnswerServiceService} = require('../default-answer-pb/default-answer_grpc_pb');
const {getRequestSchema, setRequestSchema} = require('./validators');

// error messages
const internalError = 'Internal server error.';
const noResults = 'No results found for provided advert id.';

// param names
const advertidParam = 'advertid';
const messageParam = 'message';
const typeParam = 'type';

// promisify connection.query function
let queryPromise = util.promisify(connection.query);

// table name
const defaultAnswerTable = 'default_answer';

// service methods
async function get(call, callback) {
    let advertid = call.request.getAdvertid();
    logger.info('Called get');

    // validate input
    let validation = getRequestSchema.validate(advertid);

    if (validation.error) {
        return callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: validation.error.details[0].message
        });
    }

    let selectQuery = `SELECT * FROM ${defaultAnswerTable} WHERE ${advertidParam} = ${connection.escape(validation.value)}`;

    try {
        let results = await queryPromise.call(connection, selectQuery);

        if (results.length !== 0) {
            return callback(null, createGetResponse(results[0]))
        } else {
            return callback({
                code: grpc.status.NOT_FOUND,
                message: noResults
            });
        }
    } catch (error) {
        logger.error(error);
        return callback({
            code: grpc.status.INTERNAL,
            message: internalError
        });
    }
}

async function set(call, callback) {
    let setRequest = call.request.toObject();

    // validate input
    let validation = setRequestSchema.validate(setRequest);

    if (validation.error) {
        return callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: validation.error.details[0].message
        });
    }

    try {
        // check if advert with provided id already exists
        let selectQuery = `SELECT * FROM ${defaultAnswerTable} WHERE ${advertidParam} = ${connection.escape(validation.value.advertid)}`;
        let results = await queryPromise.call(connection, selectQuery);

        if (results.length !== 0) {
            // update default answer for advert that already exists
            let updateQuery = `UPDATE ${defaultAnswerTable} SET type = ${connection.escape(setRequest.type)}, message = ${connection.escape(setRequest.message)} WHERE ${advertidParam} = ${connection.escape(setRequest.advertid)}`;

            await queryPromise.call(connection, updateQuery);

            let selectUpdated = `SELECT * FROM ${defaultAnswerTable} WHERE ${advertidParam} = ${connection.escape(setRequest.advertid)}`;

            let select = await queryPromise.call(connection, selectUpdated);

            if (select.length === 0) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: noResults
                });
            }

            return callback(null, createSetResponse(select[0]));
        } else {
            // create query for inserting new default answer object
            let insertQuery = `INSERT INTO ${defaultAnswerTable} (${advertidParam}, ${typeParam}, ${messageParam}) VALUES(${connection.escape(setRequest.advertid)}, ${connection.escape(setRequest.type)}, ${connection.escape(setRequest.message)})`;

            // insert new object
            let insert = await queryPromise.call(connection, insertQuery);

            let selectQuery = `SELECT * FROM ${defaultAnswerTable} WHERE id = ${insert.insertId}`;

            // get the newly created object
            let select = await queryPromise.call(connection, selectQuery);

            if(select.length === 0) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: noResults
                })
            }

            return callback(null, createSetResponse(select[0]));
        }

    } catch (error) {
        logger.error(error);
        return callback({
            code: grpc.status.INTERNAL,
            message: internalError
        });
    }
}

function getServer() {
    let server = new grpc.Server();

    server.addService(DefaultAnswerServiceService, {
        get: get,
        set: set,
    });

    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
    server.start();
    logger.info('Server started...');

    return server;
}

module.exports = getServer;

