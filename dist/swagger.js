"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Transaction API',
        description: 'A simple API to simulate simple transactions'
    },
    servers: [
        {
            "url": "https://txn-api.vercel.app",
            "description": "Production"
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/user.routes.ts', './routes/transaction.route.ts'];
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
//# sourceMappingURL=swagger.js.map