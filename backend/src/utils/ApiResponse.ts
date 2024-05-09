class ApiResponse {
    public statusCode: number;
    public success: boolean;
    public message: string;
    public data: Record<string, any>;

    /**
     * Constructor for ApiResponse.
     *
     * @param {number} statusCode - The HTTP status code of the response (default 200).
     * @param {Object} data - The data returned in the response.
     * @param {string} [message="Success"] - The message associated with the response (default is "Success").
     */
    constructor(statusCode: number = 200, message: string = "Success", data: Record<string, any> = {}) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
