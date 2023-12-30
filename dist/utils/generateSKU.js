"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateNextSequentialID(lastValue) {
    const prefix = "MMJ";
    const counter = lastValue ? parseInt(lastValue.substring(3)) + 1 : 0;
    const formattedCounter = counter.toString().padStart(5, "0");
    const id = `${prefix}${formattedCounter}`;
    return id;
}
exports.default = generateNextSequentialID;
