"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCsvToListOfObject = void 0;
const csvtojson_1 = __importDefault(require("csvtojson"));
async function convertCsvToListOfObject(csvFile) {
    try {
        const bufferString = csvFile.buffer.toString();
        const json = await (0, csvtojson_1.default)().fromString(bufferString);
        return json; // Return the array of objects
    }
    catch (error) {
        console.error('Error converting CSV to JSON:', error);
        throw error;
    }
}
exports.convertCsvToListOfObject = convertCsvToListOfObject;
