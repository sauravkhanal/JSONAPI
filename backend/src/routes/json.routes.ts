import {Router} from "express";
import {getJson, storeJson} from "../controllers/json.controllers"

const jsonRoutes = Router()

jsonRoutes.route("/json/:name").get(getJson);
jsonRoutes.route("/json").post(storeJson)


export default jsonRoutes