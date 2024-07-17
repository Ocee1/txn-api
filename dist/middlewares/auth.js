"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const encrypt_utils_1 = __importDefault(require("../utils/encrypt.utils"));
class Auth {
    constructor() { }
    authorize = async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            return res.status(403).send({ error: 'Unauthorised User' });
        if (typeof token !== 'string')
            return res.status(403).send({ error: { message: 'Invalid Authorization token' } });
        try {
            const decodeToken = await encrypt_utils_1.default.decrypt(token);
            const id = decodeToken.id;
            const user1 = await user_1.default.findById(id);
            if (!user1)
                return res.status(403).send({ error: { message: 'User not authorized' } });
            req.user = user1;
            next();
        }
        catch (e) {
            const errors = ['TokenExpiredError', 'NotBeforeError', 'JsonWebTokenError'];
            if (errors.includes(e?.name))
                return res.status(403).send(e);
            next(e);
        }
    };
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map