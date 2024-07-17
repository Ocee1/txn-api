import { NextFunction, Request, Response } from "express";
import TransactionController from "../controllers/transactionController";
import TransactionService from "../services/transactionService";
import TransactionValidationSchema from "../validators/transactionValidation";
import AppResponse from "../utils/Response";
import { IUser } from "../models/user";
import { ITransaction } from "../models/transactions";


jest.mock("../services/transactionService");
import { ICreateTxn } from "../interfaces/validation.interface";
jest.mock("../validators/transactionValidation");
jest.mock("../utils/Response");

describe("TransactionController", () => {
  let transactionController: TransactionController;
  let transactionServiceMock: jest.Mocked<TransactionService>;
  let validationSchemaMock: jest.Mocked<TransactionValidationSchema>;
  let responseMock: jest.Mocked<AppResponse>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  // @ts-ignore
  const mockUser: IUser = {
    id: "123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    // Add other properties as defined in your IUser interface
  };

  const mockTransaction: ICreateTxn = {
    user_id: "123",
    amount: 100,
    transaction_type: "credit",
    description: "Test transaction",
    timestamp: new Date(),
    // Other properties as required by ITransaction interface
  };

  beforeEach(() => {
    transactionServiceMock = new TransactionService() as jest.Mocked<TransactionService>;
    validationSchemaMock = new TransactionValidationSchema() as jest.Mocked<TransactionValidationSchema>;
    responseMock = new AppResponse() as jest.Mocked<AppResponse>;

    transactionController = new TransactionController();

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
      transactionServiceMock.createTransaction.mockResolvedValue(mockTransaction as any);
      await transactionController.createTransaction(req as Request, res as Response, next);
      expect(transactionServiceMock.createTransaction).toHaveBeenCalledWith({ ...req.body, user_id: req.user.id });
      expect(responseMock.created).toHaveBeenCalledWith(res, { id: "transaction123" });
    });

    it("should return 400 if validation fails", async () => {
      // @ts-ignore
      validationSchemaMock.validateTransaction.mockReturnValue({ error: { message: "Invalid data" }, value: null });
      await transactionController.createTransaction(req as Request, res as Response, next);
      expect(responseMock.badRequest).toHaveBeenCalledWith(res, { error: { message: "Invalid data" } });
    });

    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      validationSchemaMock.validateTransaction.mockReturnValue({ error: null, value: req.body });
      transactionServiceMock.createTransaction.mockRejectedValue(error);
      await transactionController.createTransaction(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getTransactions", () => {
    it("should return transactions data", async () => {
      // @ts-ignore
      transactionServiceMock.getTransactions.mockResolvedValue({ transactions: [] });
      await transactionController.getTransactions(req as Request, res as Response, next);
      expect(transactionServiceMock.getTransactions).toHaveBeenCalledWith(req.user.id, 1, 10);
      expect(responseMock.success).toHaveBeenCalledWith(res, { transactions: [] });
    });

    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      transactionServiceMock.getTransactions.mockRejectedValue(error);
      await transactionController.getTransactions(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getTransactionById", () => {
    it("should return a transaction if found", async () => {
      // @ts-ignore
      transactionServiceMock.getTransactionById.mockResolvedValue({ id: "transaction123" });
      req.params.id = "transaction123";
      await transactionController.getTransactionById(req as Request, res as Response, next);
      expect(transactionServiceMock.getTransactionById).toHaveBeenCalledWith(req.user.id, "transaction123");
      expect(responseMock.success).toHaveBeenCalledWith(res, { id: "transaction123" });
    });

    it("should return 404 if transaction not found", async () => {
      transactionServiceMock.getTransactionById.mockResolvedValue(null);
      req.params.id = "transaction123";
      await transactionController.getTransactionById(req as Request, res as Response, next);
      expect(transactionServiceMock.getTransactionById).toHaveBeenCalledWith(req.user.id, "transaction123");
      expect(responseMock.notFound).toHaveBeenCalledWith(res, { error: { message: "Transaction not found" } });
    });

    it("should call next with error if service fails", async () => {
      const error = new Error("Service error");
      req.params.id = "transaction123";
      transactionServiceMock.getTransactionById.mockRejectedValue(error);
      await transactionController.getTransactionById(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // Repeat similar patterns for other methods like updateTransaction, deleteTransaction, getTransactionSummary, and getHistoricalTransactionVolume.
});
