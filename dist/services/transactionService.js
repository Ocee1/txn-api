"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_1 = __importDefault(require("../models/transactions"));
class TransactionService {
    model = transactions_1.default;
    createTransaction = async (data) => {
        return await this.model.create(data);
    };
    getTransactions = async (userId, page, limit) => {
        const skip = (page - 1) * limit;
        const transactions = await transactions_1.default.find({ user_id: userId })
            .skip(skip)
            .limit(limit);
        const totalDocuments = await transactions_1.default.countDocuments({ user_id: userId });
        return {
            transactions,
            totalPages: Math.ceil(totalDocuments / limit),
            currentPage: page
        };
    };
    getTransactionById = async (userId, id) => {
        return await transactions_1.default.findById({ _id: id, user_id: userId });
    };
    updateTransaction = async (userId, id, data) => {
        return await this.model.findByIdAndUpdate({ _id: id, user_id: userId }, data, { new: true });
    };
    deleteTransaction = async (userId, id) => {
        return await transactions_1.default.findByIdAndDelete({ _id: id, user_id: userId });
    };
    getTransactionSummary = async (userId) => {
        const transactions = await transactions_1.default.find({ user_id: userId });
        const summary = transactions.reduce((acc, transaction) => {
            if (transaction.transaction_type === 'credit') {
                acc.totalCredits += transaction.amount;
            }
            else if (transaction.transaction_type === 'debit') {
                acc.totalDebits += transaction.amount;
            }
            return acc;
        }, { totalCredits: 0, totalDebits: 0 });
        const balance = summary.totalCredits - summary.totalDebits;
        return {
            totalCredits: summary.totalCredits,
            totalDebits: summary.totalDebits,
            balance: balance
        };
    };
    getHistoricalTransactionVolume = async (userId, startDate, endDate) => {
        const aggregatedData = await this.model.aggregate([
            {
                $match: {
                    user_id: userId,
                    timestamp: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    totalVolume: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        // Format data for charting library
        const chartData = aggregatedData.map((item) => ({
            date: item._id,
            volume: item.totalVolume
        }));
        return chartData;
    };
}
exports.default = TransactionService;
//# sourceMappingURL=transactionService.js.map