"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const transactionService_1 = __importDefault(require("../services/transactionService"));
const transactionValidation_1 = __importDefault(require("../validators/transactionValidation"));
const Response_1 = __importDefault(require("../utils/Response"));
// Mock the dependencies
jest.mock('../services/transactionService');
jest.mock('../validators/transactionValidation');
jest.mock('../utils/Response');
const mockTransactionService = new transactionService_1.default();
const mockValidationSchema = new transactionValidation_1.default();
const mockAppResponse = new Response_1.default();
describe('TransactionController', () => {
    let transactionController;
    let req;
    let res;
    let next;
    beforeEach(() => {
        transactionController = new transactionController_1.default();
        req = {
            body: {},
            // @ts-ignore
            user: { id: 'userId' },
            query: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    describe('createTransaction', () => {
        it('should create a transaction successfully', async () => {
            const mockTransaction = { id: 'transactionId' };
            req.body = {
                user_id: 1234567,
                amount: 100,
                transaction_type: 'credit',
            };
            ;
            // @ts-ignore
            mockValidationSchema.validateTransaction.mockReturnValue({ error: null });
            // @ts-ignore
            mockTransactionService.createTransaction.mockResolvedValue(mockTransaction);
            await transactionController.createTransaction(req, res, next);
            expect(mockValidationSchema.validateTransaction).toHaveBeenCalledWith(req.body);
            expect(mockTransactionService.createTransaction).toHaveBeenCalledWith({ ...req.body, user_id: req.user.id });
            expect(mockAppResponse.created).toHaveBeenCalledWith(res, mockTransaction);
        });
        it('should handle validation error', async () => {
            const mockError = { message: 'Validation error' };
            // @ts-ignore
            mockValidationSchema.validateTransaction.mockReturnValue({ error: mockError });
            await transactionController.createTransaction(req, res, next);
            expect(mockValidationSchema.validateTransaction).toHaveBeenCalledWith(req.body);
            expect(mockAppResponse.badRequest).toHaveBeenCalledWith(res, { error: { message: mockError.message } });
        });
        it('should handle service error', async () => {
            const mockError = new Error('Service error');
            req.body = { amount: 100 };
            // @ts-ignore
            mockValidationSchema.validateTransaction.mockReturnValue({ error: null });
            mockTransactionService.createTransaction.mockRejectedValue(mockError);
            await transactionController.createTransaction(req, res, next);
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });
    // Similarly, write tests for other methods
});
//# sourceMappingURL=user.test.js.map