import { Request, Response } from "express";
import fs from "node:fs";
import env from "../config/env";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

export function storeJson(req: Request, res: Response) {
	const { name, json: jsonData } = req.body;
	console.log("received new request");

    try{
        const obj = JSON.parse(jsonData)
    }
    catch(error: any) {
        return res.status(400).json(
			new ApiError(400, "Invalid json format", {
				fieldError: {
					name: "",
					json: error.message,
				},
			})
		);
    }

	if (isValidObject(JSON.parse(jsonData))) {
        console.log("inside true")
		const newName = checkAndUpdate(name);
		//store the data
		saveJson({ newName, jsonData });
		const url = generateFileURL(newName);
		return res.status(200).json(
            new ApiResponse(200, "Json hosted successfully!", {
                parsingUrl: url,
			})
		);
		// generate url for json from public file
	} else {
        console.log("inside false")
		return res.status(400).json(
			new ApiError(400, "Invalid json format", {
				fieldError: {
					name: "",
					json: "",
				},
			})
		);
	}
}

function saveJson({
	newName,
	jsonData,
}: {
	newName: string;
	jsonData: object;
}) {
	fs.writeFileSync(`./public/json/${newName}.json`, JSON.stringify(jsonData));
}

function isValidObject(obj: object) {
	return typeof obj === "object" && obj !== null;
}

function validateJson(jsonString: string): boolean {
	try {
		JSON.parse(jsonString);
		return true;
	} catch (error) {
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
function checkAndUpdate(name: string): string {
	const fileNamesData = fs.readFileSync("src/DB/usedNames.json", "utf-8");
	const fileNames: string[] = JSON.parse(fileNamesData);
	let newName = name;

	//TODO: implement efficient searching algorithm eg: Binary search
	while (fileNames.includes(newName)) {
		let twoDigitRandomNumber = Math.floor(Math.random() * 100);
		newName = newName + twoDigitRandomNumber.toString();
	}
	fileNames.push(newName); //may as well keep name in sorted order for easier sorting
	fs.writeFileSync(
		"src/DB/usedNames.json",
		JSON.stringify(fileNames, null, 2)
	);

	return newName;
}

function generateFileURL(name: string) {
	return env.base_url + name;
}

function checkIfFileExists(name: string): boolean {
	const fileNamesData = fs.readFileSync("src/DB/usedNames.json", "utf-8");
	const fileNames: string[] = JSON.parse(fileNamesData);
	if (fileNames.includes(name)) {
		return true;
	} else {
		return false;
	}
}

export function getJson(req: Request, res: Response) {
	const { name } = req.params;
	if (checkIfFileExists(name)) {
		const filePath = `./public/json/${name}.json`;
		const file = fs.readFileSync(filePath, "utf-8");
		const obj = JSON.parse(file);
		return res.status(200).json(obj);
	} else {
		return res
			.status(404)
			.json(new ApiError(404, "The requested item doesn't exist."));
	}
}


//TODO:
// Delete files when number increases
// implement efficient searching algo