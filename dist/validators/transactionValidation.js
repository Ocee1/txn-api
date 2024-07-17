"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class TransactionValidationSchema {
    validateTransaction = (data) => {
        const schema = joi_1.default.object({
            amount: joi_1.default.number().required().positive(),
            transaction_type: joi_1.default.string().valid('credit', 'debit').required(),
            description: joi_1.default.string().max(500).optional(),
        });
        return schema.validate(data);
    };
}
exports.default = TransactionValidationSchema;
//# sourceMappingURL=transactionValidation.js.map