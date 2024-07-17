"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER = exports.corsOptions = exports.NODE_ENV = exports.RMQ_PORT = exports.RMQ_URL = exports.MONGO_URI = exports.JWT_EXPIRATION = exports.JWT_SECRET = exports.LOG_DIR = exports.PORT = exports.SERVER_HOSTNAME = exports.TEST = exports.DEVELOPMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.TEST = process.env.NODE_ENV === 'test';
exports.SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
exports.PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
exports.LOG_DIR = process.env.LOG_DIR;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRATION = process.env.JWT_EXPIRATION;
exports.MONGO_URI = process.env.MONGO_URI;
exports.RMQ_URL = process.env.RMQ_URL;
exports.RMQ_PORT = process.env.RMQ_PORT;
exports.NODE_ENV = process.env.NODE_ENV;
exports.corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};
exports.SERVER = {
    SERVER_HOSTNAME: exports.SERVER_HOSTNAME,
    PORT: exports.PORT
};
//# sourceMappingURL=config.js.map