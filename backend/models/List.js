"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModel = void 0;
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    task: { type: String, required: true },
    active: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now }
});
exports.ListModel = (0, mongoose_1.model)('List', listSchema, 'Lists');
