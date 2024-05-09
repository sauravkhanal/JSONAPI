import {Router} from "express"
import {baseController} from "../controllers/base.controllers";

const baseRoute = Router();

baseRoute.get("/", baseController.defaultResponse)
baseRoute.route("/").post(baseController.echoBody)


export default baseRoute