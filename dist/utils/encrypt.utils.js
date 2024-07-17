"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
class Crypto {
    constructor() { }
    static encrypt = async (data) => {
        const result = (0, jsonwebtoken_1.sign)(data, config_1.JWT_SECRET, { algorithm: 'HS512', expiresIn: config_1.JWT_EXPIRATION });
        return result;
    };
    static decrypt = async (jwtToken) => {
        const result = (0, jsonwebtoken_1.verify)(jwtToken, config_1.JWT_SECRET);
        return result;
    };
    static hashString = async (toBeHashedData) => {
        const hashPass = await (0, bcrypt_1.hash)(toBeHashedData.trim(), 11);
        return hashPass;
    };
    static compareStrings = async (hashedString, toBeComparedString) => {
        const result = await (0, bcrypt_1.compare)(toBeComparedString.trim(), hashedString);
        return result;
    };
}
exports.default = Crypto;
//# sourceMappingURL=encrypt.utils.js.map