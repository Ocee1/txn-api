"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionService_1 = __importDefault(require("../services/transactionService"));
const transactionValidation_1 = __importDefault(require("../validators/transactionValidation"));
const Response_1 = __importDefault(require("../utils/Response"));
const moment_1 = __importDefault(require("moment"));
class TransactionController {
    transactionService = new transactionService_1.default();
    validation = new transactionValidation_1.default();
    response = new Response_1.default();
    createTransaction = async (req, res, next) => {
        const { body, user } = req;
        try {
            const { error } = this.validation.validateTransaction(body);
            if (error)
                return this.response.badRequest(res, { error: { message: error.message } });
            const data = {
                ...body,
                user_id: req.user.id
            };
            const transaction = await this.transactionService.createTransaction(data);
            this.response.created(res, transaction);
        }
        catch (error) {
            next(error);
        }
    };
    getTransactions = async (req, res, next) => {
        const { query, user } = req;
        try {
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const transactionsData = await this.transactionService.getTransactions(user.id, page, limit);
            this.response.success(res, transactionsData);
        }
        catch (error) {
            next(error);
        }
    };
    getTransactionById = async (req, res, next) => {
        const { params, user } = req;
        try {
            const transaction = await this.transactionService.getTransactionById(user.id, params.id);
            if (transaction) {
                this.response.success(res, transaction);
            }
            else {
                this.response.notFound(res, { error: { message: 'Transaction not found' } });
            }
        }
        catch (error) {
            next(error);
        }
    };
    updateTransaction = async (req, res, next) => {
        const { body, params, user } = req;
        try {
            await this.transactionService.updateTransaction(user.id, params.id, body);
            this.response.accepted(res, { message: 'Transaction update queued for processing.' });
        }
        catch (error) {
            next(error);
        }
    };
    async deleteTransaction(req, res, next) {
        const { params, user } = req;
        try {
            const transaction = await this.transactionService.deleteTransaction(user.id, params.id);
            if (transaction) {
                this.response.success(res, transaction);
            }
            else {
                this.response.success(res, { error: { message: 'Transaction not found' } });
            }
        }
        catch (error) {
            next(error);
        }
    }
    getTransactionSummary = async (req, res, next) => {
        try {
            const summary = await this.transactionService.getTransactionSummary(req.user.id);
            this.response.success(res, summary);
        }
        catch (error) {
            next(error);
        }
    };
    async getHistoricalTransactionVolume(req, res, next) {
        const { user, query } = req;
        try {
            const { startDate, endDate } = query;
            const userId = user.id;
            if (!startDate || !endDate || !(0, moment_1.default)(startDate, moment_1.default.ISO_8601, true).isValid() || !(0, moment_1.default)(endDate, moment_1.default.ISO_8601, true).isValid()) {
                return this.response.badRequest(res, { message: 'Invalid date range. Please provide valid ISO date strings for startDate and endDate.' });
            }
            const chartData = await this.transactionService.getHistoricalTransactionVolume(userId, new Date(startDate), new Date(endDate));
            res.status(200).json(chartData);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = TransactionController;
//# sourceMappingURL=transactionController.js.map