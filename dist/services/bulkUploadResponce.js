"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getBulkResponceService = void 0;
const index_1 = require("../relation/index");
async function _getBulkResponceService() {
    try {
        const category = await index_1.BulkUploadTable.findAll();
        return {
            data: category,
            message: "Bulk Response list retrieved successfully",
        };
    }
    catch (error) {
        console.error('Error fetching bulk response:', error);
        throw error;
    }
}
exports._getBulkResponceService = _getBulkResponceService;
