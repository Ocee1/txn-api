"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const transactionService_1 = __importDefault(require("../services/transactionService"));
const transactionValidation_1 = __importDefault(require("../validators/transactionValidation"));
const Response_1 = __importDefault(require("../utils/Response"));
jest.mock("../services/transactionService");
jest.mock("../validators/transactionValidation");
jest.mock("../utils/Response");
describe("TransactionController", () => {
    let transactionController;
    let transactionServiceMock;
    let validationSchemaMock;
    let responseMock;
    let req;
    let res;
    let next;
    // @ts-ignore
    const mockUser = {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        // Add other properties as defined in your IUser interface
    };
    const mockTransaction = {
        user_id: "123",
        amount: 100,
        transaction_type: "credit",
        description: "Test transaction",
        timestamp: new Date(),
        // Other properties as required by ITransaction interface
    };
    beforeEach(() => {
        transactionServiceMock = new transactionService_1.default();
        validationSchemaMock = new transactionValidation_1.default();
        responseMock = new Response_1.default();
        transactionController = new transactionController_1.default();
        req = {
            body: {},
            query: {},
            params: {},
            user: mockUser
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });
    describe("createTransaction", () => {
        it("should create a transaction and return 201 status", async () => {
            validationSchemaMock.validateTransaction.mockReturnValue({ error: null, value: req.body });
            transactionServiceMock.createTransaction.mockResolvedValue(mockTransaction);
            await transactionController.createTransaction(req, res, next);
            expect(transactionServiceMock.createTransaction).toHaveBeenCalledWith({ ...req.body, user_id: req.user.id });
            expect(responseMock.created).toHaveBeenCalledWith(res, { id: "transaction123" });
        });
        it("should return 400 if validation fails", async () => {
            // @ts-ignore
            validationSchemaMock.validateTransaction.mockReturnValue({ error: { message: "Invalid data" }, value: null });
            await transactionController.createTransaction(req, res, next);
            expect(responseMock.badRequest).toHaveBeenCalledWith(res, { error: { message: "Invalid data" } });
        });
        it("should call next with error if service fails", async () => {
            const error = new Error("Service error");
            validationSchemaMock.validateTransaction.mockReturnValue({ error: null, value: req.body });
            transactionServiceMock.createTransaction.mockRejectedValue(error);
            await transactionController.createTransaction(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe("getTransactions", () => {
        it("should return transactions data", async () => {
            // @ts-ignore
            transactionServiceMock.getTransactions.mockResolvedValue({ transactions: [] });
            await transactionController.getTransactions(req, res, next);
            expect(transactionServiceMock.getTransactions).toHaveBeenCalledWith(req.user.id, 1, 10);
            expect(responseMock.success).toHaveBeenCalledWith(res, { transactions: [] });
        });
        it("should call next with error if service fails", async () => {
            const error = new Error("Service error");
            transactionServiceMock.getTransactions.mockRejectedValue(error);
            await transactionController.getTransactions(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe("getTransactionById", () => {
        it("should return a transaction if found", async () => {
            // @ts-ignore
            transactionServiceMock.getTransactionById.mockResolvedValue({ id: "transaction123" });
            req.params.id = "transaction123";
            await transactionController.getTransactionById(req, res, next);
            expect(transactionServiceMock.getTransactionById).toHaveBeenCalledWith(req.user.id, "transaction123");
            expect(responseMock.success).toHaveBeenCalledWith(res, { id: "transaction123" });
        });
        it("should return 404 if transaction not found", async () => {
            transactionServiceMock.getTransactionById.mockResolvedValue(null);
            req.params.id = "transaction123";
            await transactionController.getTransactionById(req, res, next);
            expect(transactionServiceMock.getTransactionById).toHaveBeenCalledWith(req.user.id, "transaction123");
            expect(responseMock.notFound).toHaveBeenCalledWith(res, { error: { message: "Transaction not found" } });
        });
        it("should call next with error if service fails", async () => {
            const error = new Error("Service error");
            req.params.id = "transaction123";
            transactionServiceMock.getTransactionById.mockRejectedValue(error);
            await transactionController.getTransactionById(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    // Repeat similar patterns for other methods like updateTransaction, deleteTransaction, getTransactionSummary, and getHistoricalTransactionVolume.
});
//# sourceMappingURL=transaction.test.js.map