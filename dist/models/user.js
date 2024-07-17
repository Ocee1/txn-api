"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minLength: 1,
        maxLength: 30
    },
    lastName: {
        type: String,
        minLength: 1,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.default = (0, mongoose_1.model)('User', schema);
//# sourceMappingURL=user.js.map