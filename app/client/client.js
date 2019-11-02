const defaultAnswerpb = require('../default-answer-pb/default-answer_pb');
const grpc = require('grpc');
const {DefaultAnswerServiceClient} = require('../default-answer-pb/default-answer_grpc_pb');
const util = require('util');

const serviceHost = process.env.DEFAULT_ANSWER_HOST || "localhost";
const servicePort = process.env.DEFAULT_ANSWER_PORT || "50051";


async function get(data, client) {
    let request = new defaultAnswerpb.GetRequest();
    request.setAdvertid(data);

    let getPromise = util.promisify(client.get);

    try {
        let response = await getPromise.call(client, request);
        return response.getAnswer().toObject();
    } catch (error) {
        return {err: error.message, code: error.code};
    }
}

async function set(data, client) {
    let request = new defaultAnswerpb.SetRequest();

    request.setAdvertid(data.advertid);
    request.setType(defaultAnswerpb.Type[data.type]);
    request.setMessage(data.message);

    let setPromise = util.promisify(client.set);

    try {
        let response = await setPromise.call(client, request);
        return response.getAnswer().toObject();
    } catch (error) {
        return {err: error.message, code: error.code};
    }
}
//
// function getClient() {
//     let client = new DefaultAnswerServiceClient(`${serviceHost}:${servicePort}`, grpc.credentials.createInsecure());
// }

module.exports = {
    client: new DefaultAnswerServiceClient(`${serviceHost}:${servicePort}`, grpc.credentials.createInsecure()),
    setFunction: set,
    getFunction: get
};