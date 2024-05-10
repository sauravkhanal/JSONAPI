"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    /**
     * Constructor for ApiError.
     *
     * @param {number} statusCode - The HTTP status code of the response (default 500).
     * @param {Object} data - The data returned in the response.
     * @param {string} [message="Something went wrong"] - The message associated with the response (default is "Something went wrong").
     */
    constructor(statusCode = 500, message = "Something went wrong", data = {}) {
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.data = data;
    }
}
exports.default = ApiError;
