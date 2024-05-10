"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    /**
     * Constructor for ApiResponse.
     *
     * @param {number} statusCode - The HTTP status code of the response (default 200).
     * @param {Object} data - The data returned in the response.
     * @param {string} [message="Success"] - The message associated with the response (default is "Success").
     */
    constructor(statusCode = 200, message = "Success", data = {}) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}
exports.default = ApiResponse;
