const { Readable } = require("stream");
const csvParser = require("csv-parser");

function parseCSVFromBuffer(fileBuffer, onDataCallback, onEndCallback, onErrorCallback) {
  const readableStream = new Readable();
  readableStream.push(fileBuffer);
  readableStream.push(null); // Signal the end of the stream

  readableStream
    .pipe(csvParser())
    .on("data", onDataCallback)
    .on("end", onEndCallback)
    .on("error", onErrorCallback);
}

function convertArrayOfObjectsToCSV(arrayOfObjects) {
  const csv = [];
  const headers = Object.keys(arrayOfObjects[0]);
  csv.push(headers.join(","));

  arrayOfObjects.forEach((obj) => {
    const values = headers.map((header) => JSON.stringify(obj[header]));
    csv.push(values.join(","));
  });

  return csv.join("\n");
}

function createCSVWithStatus(parsedResults) {
  const newCsvContent = parsedResults.success
    .map((product) => ({
      ...product,
      Status: "Success",
    }))
    .concat(
      parsedResults.errors.map((error) => ({
        ...error.row,
        Status: "Failed: " + error.message,
      }))
    );

  return convertArrayOfObjectsToCSV(newCsvContent);
}

module.exports = {
  parseCSVFromBuffer,
  createCSVWithStatus,
};
