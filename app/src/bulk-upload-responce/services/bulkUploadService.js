const { BulkUpload } = require("../../../../models/index");
const { validatePayload } = require("../../../helper/payloadValidation");
async function _getBulkResponceService() {
    try {
        const category = await BulkUpload.findAll();
        return {
            data: category,
            message: "Bulk Responce list retrieved successfully",
        };
    } catch (error) {
        console.error('Error fetching bulk responce:', error);
        throw error;
    }
}
module.exports = {
    _getBulkResponceService,
}