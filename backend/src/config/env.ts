import * as dotenv from "dotenv";

dotenv.config();

export default {
	port: process.env.PORT || 5000,
	cors_options: process.env.CORS_OPTIONS,
	base_url: process.env.BASE_URL,
};
