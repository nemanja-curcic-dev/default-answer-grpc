const grpc = require('grpc');
const {connection} = require('../db/db');
const {DefaultAnswerServiceService} = require('../default-answer-pb/default-answer_grpc_pb');
const {getRequestSchema, setRequestSchema} = require('./validators');
const logger = require('debug-logger')('default-answer-server');
const {createGetResponse, createSetResponse} = require('./helpers');
const squel = require('squel');
const util = require('util');
const uuid = require('uuid/v1');

// error messages
const internalError = 'Internal server error.';

// promisify connection.query function
let queryPromise = util.promisify(connection.query);

const defaultAnswerTable = 'default_answer';

// service methods
async function get(call, callback) {
    let advertid = call.request.getAdvertid();

    // validate input
    let validation = getRequestSchema.validate(advertid);

    if (validation.error) {
        return callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: validation.error.details[0].message
        });
    }

    let selectQuery = squel.select()
        .from(defaultAnswerTable)
        .where(`advertid = ${connection.escape(validation.value)}`)
        .toString();

    try {
        let results = await queryPromise.call(connection, selectQuery);

        if (results.length !== 0) {
            return callback(null, createGetResponse(results[0]))
        } else {
            return callback({
                code: grpc.status.NOT_FOUND,
                message: 'No results found for provided advert id.'
            });
        }

    } catch (error) {
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

    // check if advert with provided id already exists
    let selectQuery = squel.select()
        .from(defaultAnswerTable)
        .where(`advertid = ${connection.escape(validation.value.advertid)}`)
        .toString();

    try {
        let results = await queryPromise.call(connection, selectQuery);

        if (results.length !== 0) {
            // update default answer for advert that already exists
            let updateObject = {
                id: results[0].id,
                advertid: setRequest.advertid,
                type: setRequest.type,
                message: setRequest.message
            };

            let updateQuery = squel.update()
                .table(defaultAnswerTable)
                .set("id", updateObject.id)
                .set("type", connection.escape(updateObject.type))
                .set("message", updateObject.message)
                .where(`advertid = ${connection.escape(updateObject.advertid)}`)
                .toString();

            try {
                await queryPromise.call(connection, updateQuery);

                return callback(null, createSetResponse(updateObject));
            } catch (error) {
                return callback({
                    code: grpc.status.INTERNAL,
                    message: internalError
                })
            }

        } else {
            // insert new default answer object
            let insertObject = {
                id: uuid(),
                advertid: setRequest.advertid,
                type: setRequest.type,
                message: setRequest.message
            };

            let insertQuery = squel.insert()
                .into(defaultAnswerTable)
                .set("id", insertObject.id)
                .set("advertid", insertObject.advertid)
                .set("type", insertObject.type)
                .set("message", insertObject.message)
                .toString();

            try {
                await queryPromise.call(connection, insertQuery);

                return callback(null, createSetResponse(insertObject));
            } catch (error) {
                return callback({
                    code: grpc.status.INTERNAL,
                    message: internalError
                })
            }
        }

    } catch (error) {
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

    return server;
}

(function main() {
    let routeServer = getServer();
    routeServer.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
    routeServer.start();
    logger.info('Server started...');
}());

// module.exports = getServer();

