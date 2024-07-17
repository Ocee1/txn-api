"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
class UserRouter {
    path = '/auth';
    router = (0, express_1.Router)();
    userController = new userController_1.default();
    auth = new auth_1.default();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/auth/signup`, this.userController.createUser);
        this.router.post(`/auth/signin`, this.userController.loginUser);
        this.router.get(`/profile`, this.auth.authorize, this.userController.getUserProfile);
        this.router.patch(`/profile`, this.auth.authorize, this.userController.updateUserProfile);
        this.router.delete(`/profile`, this.auth.authorize, this.userController.deleteUser);
    }
}
;
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map