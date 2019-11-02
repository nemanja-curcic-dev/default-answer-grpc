const defaultAnswerpb = require('../default-answer-pb/default-answer_pb');

function createDefaultAnswer(result) {
    let defaultAnswer = new defaultAnswerpb.DefaultAnswer();

    defaultAnswer.setId(result.id);
    defaultAnswer.setAdvertid(result.advertid);
    defaultAnswer.setType(result.type);
    defaultAnswer.setMessage(result.message);

    return defaultAnswer;
}

function createGetResponse(result) {
    let response = new defaultAnswerpb.GetResponse();
    response.setAnswer(createDefaultAnswer(result));
    return response
}

function createSetResponse(result) {
    let response = new defaultAnswerpb.SetResponse();
    response.setAnswer(createDefaultAnswer(result));
    return response
}

module.exports = {
    createGetResponse: createGetResponse,
    createSetResponse: createSetResponse,
};