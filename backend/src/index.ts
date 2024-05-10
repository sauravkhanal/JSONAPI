import express from "express";
import env from "./config/env";
import baseRoute from "./routes/base.routes";
import cors from "cors";
import jsonRoutes from "./routes/json.routes";
import ApiError from "./utils/ApiError";


// initialize server
const app = express();


// CORS configuration
const corsOptions = {
  origin: env.cors_options, // Change this to a specific origin or array of origins if needed
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));


// middlewares
app.use(express.json());
// Middleware to handle errors
app.use((err:any, req:any, res:any, next:any) => {
  // Check if the error is related to JSON parsing
  if (err instanceof SyntaxError && 'body' in err) {
    // Send a clean error message to the frontend
    return res.status(400).json(
      new ApiError(400, "Invalid json format", {
        fieldError: {
          name: "",
          json: err.message,
        },
      })
    );
  } else {
    // For other types of errors, pass it to the default error handler
    next(err);
  }
});

//
app.use(express.static('public/json'));

//routes
app.use(baseRoute);
app.use(jsonRoutes)



// run server and listen for incoming requests
const listenCallback = () => {
	const url = `http://localhost:${env.port}`;
	console.log(`Server running at \x1b[35m${url}\x1b[0m.`);
};
app.listen(env.port, listenCallback);
