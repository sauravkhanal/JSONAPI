"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const json_controllers_1 = require("../controllers/json.controllers");
const jsonRoutes = (0, express_1.Router)();
jsonRoutes.route("/json/:name").get(json_controllers_1.getJson);
jsonRoutes.route("/json").post(json_controllers_1.storeJson);
exports.default = jsonRoutes;
