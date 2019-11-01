const grpc = require('grpc');
const { DefaultAnswerServiceClient } = require('../default-answer-pb/default-answer_grpc_pb');

function get(client) {
    let request = '';

    client.get()
}

function getClient() {
    let client = new DefaultAnswerServiceClient("localhost:50051", grpc.credentials.createInsecure());
}