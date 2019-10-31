// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var default$answer_pb = require('./default-answer_pb.js');

function serialize_coozzy_message_default_answer_GetRequest(arg) {
  if (!(arg instanceof default$answer_pb.GetRequest)) {
    throw new Error('Expected argument of type coozzy.message.default_answer.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_coozzy_message_default_answer_GetRequest(buffer_arg) {
  return default$answer_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_coozzy_message_default_answer_GetResponse(arg) {
  if (!(arg instanceof default$answer_pb.GetResponse)) {
    throw new Error('Expected argument of type coozzy.message.default_answer.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_coozzy_message_default_answer_GetResponse(buffer_arg) {
  return default$answer_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_coozzy_message_default_answer_SetRequest(arg) {
  if (!(arg instanceof default$answer_pb.SetRequest)) {
    throw new Error('Expected argument of type coozzy.message.default_answer.SetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_coozzy_message_default_answer_SetRequest(buffer_arg) {
  return default$answer_pb.SetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_coozzy_message_default_answer_SetResponse(arg) {
  if (!(arg instanceof default$answer_pb.SetResponse)) {
    throw new Error('Expected argument of type coozzy.message.default_answer.SetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_coozzy_message_default_answer_SetResponse(buffer_arg) {
  return default$answer_pb.SetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// ------------------------------------
//  SERVICES
// ------------------------------------ 
//
var DefaultAnswerServiceService = exports.DefaultAnswerServiceService = {
  get: {
    path: '/coozzy.message.default_answer.DefaultAnswerService/Get',
    requestStream: false,
    responseStream: false,
    requestType: default$answer_pb.GetRequest,
    responseType: default$answer_pb.GetResponse,
    requestSerialize: serialize_coozzy_message_default_answer_GetRequest,
    requestDeserialize: deserialize_coozzy_message_default_answer_GetRequest,
    responseSerialize: serialize_coozzy_message_default_answer_GetResponse,
    responseDeserialize: deserialize_coozzy_message_default_answer_GetResponse,
  },
  set: {
    path: '/coozzy.message.default_answer.DefaultAnswerService/Set',
    requestStream: false,
    responseStream: false,
    requestType: default$answer_pb.SetRequest,
    responseType: default$answer_pb.SetResponse,
    requestSerialize: serialize_coozzy_message_default_answer_SetRequest,
    requestDeserialize: deserialize_coozzy_message_default_answer_SetRequest,
    responseSerialize: serialize_coozzy_message_default_answer_SetResponse,
    responseDeserialize: deserialize_coozzy_message_default_answer_SetResponse,
  },
};

exports.DefaultAnswerServiceClient = grpc.makeGenericClientConstructor(DefaultAnswerServiceService);
