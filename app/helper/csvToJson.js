const csv = require('csvtojson');

async function convertCsvToListOfObject(csvFile) {
  try {
    console.log(csvFile)
    const butter = csvFile.buffer.toString();
    const json = await csv().fromString(butter);
    return json; // Return the array of objects
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error;
  }
}

module.exports = { convertCsvToListOfObject };
