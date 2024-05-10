"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseController = void 0;
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
function defaultResponse(req, res) {
    return res.status(200).json(new ApiResponse_1.default(200, "This is message", {
        "key field": "value field",
    }));
}
function echoBody(req, res) {
    return res.status(200).json(new ApiResponse_1.default(200, "This is message", {
        body: req.body
    }));
}
exports.baseController = { defaultResponse, echoBody };
