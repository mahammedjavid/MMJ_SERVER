import * as json2csv from 'json2csv';

async function convertObjectListToCsv(json: any[]): Promise<string> {
  try {
    // Extract headers from the first object in the array
    const csvHeaders = Object.keys(json[0]);
    // Convert array of objects to CSV string
    const csvContent = json2csv.parse(json, { fields: csvHeaders });
    console.log('CSV Content:', csvContent);

    return csvContent;

  } catch (error) {
    console.error('Error converting objects to CSV:', error);
    throw error;
  }
}

export { convertObjectListToCsv };
