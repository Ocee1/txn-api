"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
const userValidation_1 = __importDefault(require("../validators/userValidation"));
const Response_1 = __importDefault(require("../utils/Response"));
const encrypt_utils_1 = __importDefault(require("../utils/encrypt.utils"));
class UserController {
    constructor() { }
    service = new userService_1.default();
    userValidation = new userValidation_1.default();
    appResponse = new Response_1.default();
    createUser = async (req, res, next) => {
        const { body } = req;
        try {
            const { error } = this.userValidation.signupValidation(body);
            if (error)
                return this.appResponse.badRequest(res, { error: { message: error.message } });
            const isUser = await this.service.getUserByEmail(body.email);
            if (isUser)
                return this.appResponse.badRequest(res, { error: { message: 'User already exists!' } });
            const hashedPassword = await encrypt_utils_1.default.hashString(body.password);
            const userData = {
                ...body,
                password: hashedPassword
            };
            const user = await this.service.createUser(userData);
            this.appResponse.created(res, 'User created successfully');
        }
        catch (error) {
            next(error.message);
        }
    };
    loginUser = async (req, res, next) => {
        const { body } = req;
        try {
            const { error } = this.userValidation.loginValidation(body);
            if (error)
                return this.appResponse.badRequest(res, error.message);
            const isUser = await this.service.getUserByEmail(body.email);
            if (!isUser)
                return this.appResponse.badRequest(res, 'Invalid login credentials');
            const validPassword = await encrypt_utils_1.default.compareStrings(isUser.password, body.password);
            if (!validPassword)
                return this.appResponse.badRequest(res, 'Invalid login credentials');
            const accessToken = await encrypt_utils_1.default.encrypt({ id: isUser.id, email: isUser.email });
            const payload = {
                message: 'Login successful',
                userId: isUser.id,
                accessToken,
            };
            this.appResponse.success(res, payload);
        }
        catch (error) {
            next(error.message);
        }
    };
    getUserProfile = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await this.service.getUserById(userId);
            if (!user) {
                return this.appResponse.notFound(res, { message: 'User not found' });
            }
            this.appResponse.success(res, { user });
        }
        catch (error) {
            next(error);
        }
    };
    updateUserProfile = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const updates = req.body;
            const updatedUser = await this.service.findByIdAndUpdate(userId, updates);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    };
    deleteUser = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const deletedUser = await this.service.removeUser(userId);
            if (!deletedUser) {
                return this.appResponse.notFound(res, { message: 'User not found' });
            }
            this.appResponse.deleted(res);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map