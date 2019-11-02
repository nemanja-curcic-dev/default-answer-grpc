const defaultAnswerpb = require('../default-answer-pb/default-answer_pb');
const grpc = require('grpc');
const {DefaultAnswerServiceClient} = require('../default-answer-pb/default-answer_grpc_pb');
const util = require('util');

const serviceHost = process.env.DEFAULT_ANSWER_HOST || "localhost";
const servicePort = process.env.DEFAULT_ANSWER_PORT || "50051";


async function get(client) {
    let request = new defaultAnswerpb.GetRequest();
    request.setAdvertid(5);

    let getPromise = util.promisify(client.get);

    try {
        let response = await getPromise.call(client, request);
        console.log('GET:', response.getAnswer().toObject())
    } catch (error) {
        console.log('GET:', error.message, error.code);
    }
}

async function set(client) {
    let request = new defaultAnswerpb.SetRequest();

    request.setAdvertid("5");
    request.setType(defaultAnswerpb.Type.VIEWING_FIX);
    request.setMessage("You will be contacted!.");

    let setPromise = util.promisify(client.set);

    try {
        let response = await setPromise.call(client, request);
        console.log('SET:', response.getAnswer().toObject())
    } catch (error) {
        console.log('SET:', error.message, error.code);
    }
}

function getClient() {
    let client = new DefaultAnswerServiceClient(`${serviceHost}:${servicePort}`, grpc.credentials.createInsecure());
    get(client);
    set(client);
    get(client);
    set(client);
}

getClient();