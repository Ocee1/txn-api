"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transaction_type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    description: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('Transaction', transactionSchema);
//# sourceMappingURL=transactions.js.map