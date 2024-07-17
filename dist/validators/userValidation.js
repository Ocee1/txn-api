"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class UserValidationSchema {
    constructor() { }
    loginValidation = (data) => {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().trim().required(),
            password: joi_1.default.string().min(6).required(),
        });
        return schema.validate(data);
    };
    signupValidation = (data) => {
        const schema = joi_1.default.object({
            firstName: joi_1.default.string(),
            lastName: joi_1.default.string(),
            email: joi_1.default.string().email().trim().required(),
            password: joi_1.default.string().min(6).required()
                .regex(/[a-z]/, 'at least one letter')
                .regex(/[0-9]/, 'at least one number'),
        });
        return schema.validate(data);
    };
}
exports.default = UserValidationSchema;
//# sourceMappingURL=userValidation.js.map