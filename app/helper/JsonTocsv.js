const json2csv = require('json2csv').parse;
async function convertObjectListToCsv(json) {
  try {
    // Extract headers from the first object in the array
    const csvHeaders = Object.keys(json[0]);
    // Convert array of objects to CSV string
    const csvContent = json2csv(json, { fields: csvHeaders });
    console.log('CSV Content:', csvContent);

    return csvContent

  } catch (error) {
    console.error('Error converting objects to CSV:', error);
    throw error;
  }
}

module.exports = { convertObjectListToCsv };
