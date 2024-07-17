"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const path_1 = require("path");
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config/config");
const logDir = (0, path_1.join)(__dirname, config_1.LOG_DIR);
const logFormat = winston_1.default.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
        })
    ]
});
exports.logger = logger;
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize()),
}));
const stream = {
    write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};
exports.stream = stream;
//# sourceMappingURL=logger.js.map