import { CsvFile } from "../types/types";
import csv from 'csvtojson'

async function convertCsvToListOfObject(csvFile: CsvFile): Promise<any[]> {
  try {
    const bufferString = csvFile.buffer.toString();
    const json = await csv().fromString(bufferString);
    return json; // Return the array of objects
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error;
  }
}

export { convertCsvToListOfObject };
