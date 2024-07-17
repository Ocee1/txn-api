"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const logger_1 = require("./utils/logger");
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const error_1 = __importDefault(require("./middlewares/error"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
// import mqConnection from './services/rmq/rabbit';
class App {
    app;
    env;
    port;
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = process.env.NODE_ENV || 'development';
        this.port = 4000;
        this.initializeMiddlewares();
        this.initalizeErrorHandling();
        this.initializeRoutes(routes);
        // this.connectRMQ();
        this.initializaDB();
    }
    listen() {
        const server = this.app.listen(this.port, () => {
            logger_1.logger.info(`================================`);
            logger_1.logger.info(`========== ENV: ${this.env} =========`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)('common', { stream: logger_1.stream }));
        this.app.use((0, cors_1.default)(config_1.corsOptions));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, hpp_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_1.json)({ limit: '25mb' }));
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/api', route.router);
        });
    }
    // private async connectRMQ() {
    //   try {
    //     await mqConnection.connectRabbitMQ();
    //     logger.info('======================');
    //     logger.info('RabbitMQ Connected:');
    //     logger.info('======================');
    //   } catch (error) {
    //     logger.error('======================');
    //     logger.error('Failed to connect to RabbitMQ: ', error);
    //     logger.error('======================')
    //     console.error('Failed to connect to RabbitMQ', error);
    //   }
    // }
    async initializaDB() {
        try {
            const connection = await mongoose_1.default.connect(config_1.MONGO_URI);
            logger_1.logger.info('======================');
            logger_1.logger.info('MongoDB Connected:', connection.version);
            logger_1.logger.info('======================');
        }
        catch (error) {
            logger_1.logger.error('======================');
            logger_1.logger.error('Mongo Err: ', error);
            logger_1.logger.error('======================');
        }
    }
    initalizeErrorHandling() {
        this.app.use(error_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map