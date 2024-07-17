"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
class TransactionRouter {
    path = '/transactions';
    router = (0, express_1.Router)();
    transactionController = new transactionController_1.default();
    auth = new auth_1.default();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/transactions', this.auth.authorize, this.transactionController.createTransaction);
        this.router.get('/transactions', this.auth.authorize, this.transactionController.getTransactions);
        this.router.get('/transactions/:id', this.auth.authorize, this.transactionController.getTransactionById);
        this.router.patch('/transactions/:id', this.auth.authorize, this.transactionController.updateTransaction);
        this.router.delete('/transactions/:id', this.auth.authorize, this.transactionController.deleteTransaction);
        this.router.get('/transactions-summary', this.auth.authorize, this.transactionController.getTransactionSummary);
        this.router.get('/historical-transaction-volume', this.auth.authorize, this.transactionController.getHistoricalTransactionVolume);
    }
}
exports.default = TransactionRouter;
//# sourceMappingURL=transaction.route.js.map