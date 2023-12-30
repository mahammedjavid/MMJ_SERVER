import { BulkUploadTable } from "../relation/index";
import { validatePayload } from "../helper/payloadValidation";

async function _getBulkResponceService() {
  try {
    const category = await BulkUploadTable.findAll();
    return {
      data: category,
      message: "Bulk Response list retrieved successfully",
    };
  } catch (error) {
    console.error('Error fetching bulk response:', error);
    throw error;
  }
}

export { _getBulkResponceService };
