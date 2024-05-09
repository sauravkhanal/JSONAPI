class ApiError {
	public statusCode: number;
	public success: boolean;
	public message: string;
	public data: Record<string, any>;

    /**
     * Constructor for ApiError.
     *
     * @param {number} statusCode - The HTTP status code of the response (default 500).
     * @param {Object} data - The data returned in the response.
     * @param {string} [message="Something went wrong"] - The message associated with the response (default is "Something went wrong").
     */

	constructor(
		statusCode: number = 500,
		message: string = "Something went wrong",
		data: Record<string, any> = {}
	) {
		this.statusCode = statusCode;
		this.success = false;
		this.message = message;
		this.data = data;
	}
}


export default ApiError
