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
    const values = headers.map((header) => {
      const value = obj[header];
      if (Array.isArray(value)) {
        // Convert array to comma-separated string
        return value.join(",");
      }
      return JSON.stringify(value);
    });
    csv.push(values.join(","));
  });

  return csv.join("\n");
}

function createCSVWithStatus(parsedResults) {
  const newCsvContent = parsedResults.success.map((product) => {
    const productCopy = { ...product };
    // Convert arrays to comma-separated strings in success object
    Object.keys(productCopy).forEach((key) => {
      if (Array.isArray(productCopy[key])) {
        productCopy[key] = productCopy[key].join(",");
      }
    });
    return { ...productCopy, Status: "Success" };
  }).concat(
    parsedResults.errors.map((error) => {
      const errorObj = { ...error.row, Status: "Failed: " + error.message };
      // Convert arrays to comma-separated strings in error object
      Object.keys(errorObj).forEach((key) => {
        if (Array.isArray(errorObj[key])) {
          errorObj[key] = errorObj[key].join(",");
        }
      });
      return errorObj;
    })
  );

  return convertArrayOfObjectsToCSV(newCsvContent);
}

module.exports = {
  parseCSVFromBuffer,
  createCSVWithStatus,
};
