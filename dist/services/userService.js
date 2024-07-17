"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
class UserService {
    constructor() { }
    model = user_1.default;
    createUser = async (data) => {
        const result = await this.model.create(data);
        return result;
    };
    getUserById = async (id) => {
        const user = (await this.model.findById(id)).isSelected('-password');
        return user;
    };
    getUserByEmail = async (email) => {
        const user = (await this.model.findOne({ email }));
        return user;
    };
    findByIdAndUpdate = async (data, id) => {
        const user = await this.model.findByIdAndUpdate(id, data, { upsert: false });
        return user;
    };
    removeUser = async (id) => {
        const user = await this.model.findByIdAndDelete(id);
        return user;
    };
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map