import * as fs from "fs";
import * as path from "path";
import { outputScoresInOrder } from "./outputScoresInOrder";

const args = process.argv;

const filename = args[2];

const numberOfLines = parseInt(args[3]);

const fileContent = fs.readFileSync(path.join(__dirname, filename), "utf-8");

const result = outputScoresInOrder(fileContent, numberOfLines);

console.log(JSON.stringify(result, null, 2));
