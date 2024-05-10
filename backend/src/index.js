"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./config/env"));
const base_routes_1 = __importDefault(require("./routes/base.routes"));
const cors_1 = __importDefault(require("cors"));
const json_routes_1 = __importDefault(require("./routes/json.routes"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
// initialize server
const app = (0, express_1.default)();
// CORS configuration
const corsOptions = {
    origin: env_1.default.cors_options, // Change this to a specific origin or array of origins if needed
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
// middlewares
app.use(express_1.default.json());
// Middleware to handle errors
app.use((err, req, res, next) => {
    // Check if the error is related to JSON parsing
    if (err instanceof SyntaxError && 'body' in err) {
        // Send a clean error message to the frontend
        return res.status(400).json(new ApiError_1.default(400, "Invalid json format", {
            fieldError: {
                name: "",
                json: err.message,
            },
        }));
    }
    else {
        // For other types of errors, pass it to the default error handler
        next(err);
    }
});
//
app.use(express_1.default.static('public/json'));
//routes
app.use(base_routes_1.default);
app.use(json_routes_1.default);
// run server and listen for incoming requests
const listenCallback = () => {
    const url = `http://localhost:${env_1.default.port}`;
    console.log(`Server running at \x1b[35m${url}\x1b[0m.`);
};
app.listen(env_1.default.port, listenCallback);
