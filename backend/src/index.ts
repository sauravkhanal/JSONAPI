import express from "express";
import env from "./config/env";
import baseRoute from "./routes/base.routes";


// initialize server
const app = express();


// middlewares
app.use(express.json());


//routes
app.use(baseRoute);




// run server and listen for incoming requests
const listenCallback = () => {
	const url = `http://localhost:${env.port}`;
	console.log(`Server running at \x1b[35m${url}\x1b[0m.`);
};
app.listen(env.port, listenCallback);
