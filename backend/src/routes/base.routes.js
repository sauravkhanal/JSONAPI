"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const base_controllers_1 = require("../controllers/base.controllers");
const baseRoute = (0, express_1.Router)();
baseRoute.get("/", base_controllers_1.baseController.defaultResponse);
baseRoute.route("/").post(base_controllers_1.baseController.echoBody);
exports.default = baseRoute;
