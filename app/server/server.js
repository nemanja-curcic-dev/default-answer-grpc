const {connection, tableCreate} = require('../db/db');
const grpc = require('grpc');
const { DefaultAnswerServiceService } = require('../default-answer-pb/default-answer_grpc_pb');

// connection.query(tableCreate, (error, results, fields) => {
//     if (error) {
//         throw error;
//     }
// });

// service methods
function get(call, callback) {
    let advertId = call.request.getAdvertid();

}

function set(call, callback) {

}

function getServer() {
    let server = new grpc.Server();

    server.addService(DefaultAnswerServiceService, {
        get: get,
        set: set,
    });

    return server;
}

module.exports = getServer();

