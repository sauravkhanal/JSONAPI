"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJson = exports.storeJson = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const env_1 = __importDefault(require("../config/env"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const node_path_1 = __importDefault(require("node:path"));
function storeJson(req, res) {
    const { name, json: jsonData } = req.body;
    try {
        if (isValidObject(jsonData)) {
            console.log("inside true");
            const newName = checkAndUpdate(name);
            //store the data
            saveJson({ newName, jsonData });
            const url = generateFileURL(newName);
            return res.status(200).json(new ApiResponse_1.default(200, "Json hosted successfully!", {
                parsingUrl: url,
            }));
            // generate url for json from public file
        }
        else {
            console.log("inside false");
            return res.status(400).json(new ApiError_1.default(400, "Invalid json format", {
                fieldError: {
                    name: "",
                    json: "",
                },
            }));
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(new ApiError_1.default(400, "Invalid json format", {
            fieldError: {
                name: "",
                json: error.message,
            },
        }));
    }
}
exports.storeJson = storeJson;
function saveJson({ newName, jsonData, }) {
    const filePath = node_path_1.default.resolve(__dirname, "../../", "public", "json", `${newName}.json`);
    node_fs_1.default.writeFileSync(filePath, JSON.stringify(jsonData));
}
function isValidObject(obj) {
    return typeof obj === "object" && obj !== null;
}
function validateJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    }
    catch (error) {
        return false;
    }
}
// validate json
// store json
// generate url for json from public file
/**
 * Saves the name of the json data in the usedNames list.
 * Appends two digit number to the name of json data if name already exists.
 * @param name Name of json data given by user.
 * @returns The name of the json data, gives new name if given name already exists.
 */
function checkAndUpdate(name) {
    const filePath = node_path_1.default.resolve(__dirname, "../", "DB", "usedNames.json");
    const fileNamesData = node_fs_1.default.readFileSync(filePath, "utf-8");
    const fileNames = JSON.parse(fileNamesData);
    let newName = name;
    //TODO: implement efficient searching algorithm eg: Binary search
    while (fileNames.includes(newName)) {
        let twoDigitRandomNumber = Math.floor(Math.random() * 100);
        newName = newName + twoDigitRandomNumber.toString();
    }
    fileNames.push(newName); //may as well keep name in sorted order for easier sorting
    node_fs_1.default.writeFileSync(filePath, JSON.stringify(fileNames, null, 2));
    return newName;
}
function generateFileURL(name) {
    return env_1.default.base_url + name;
}
function checkIfFileExists(name) {
    const filePath = node_path_1.default.join(__dirname, "../", "DB", "usedNames.json");
    const fileNamesData = node_fs_1.default.readFileSync(filePath, "utf-8");
    const fileNames = JSON.parse(fileNamesData);
    if (fileNames.includes(name)) {
        return true;
    }
    else {
        return false;
    }
}
function getJson(req, res) {
    const { name } = req.params;
    if (checkIfFileExists(name)) {
        const filePath = node_path_1.default.resolve(__dirname, "../../", "public", "json", `${name}.json`);
        // const filePath = `./public/json/${name}.json`;
        const file = node_fs_1.default.readFileSync(filePath, "utf-8");
        const obj = JSON.parse(file);
        return res.status(200).json(obj);
    }
    else {
        return res
            .status(404)
            .json(new ApiError_1.default(404, "The requested item doesn't exist."));
    }
}
exports.getJson = getJson;
//TODO:
// Delete files when number increases
// implement efficient searching algo
