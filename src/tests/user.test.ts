import { Request, Response, NextFunction } from 'express';
import TransactionController from '../controllers/transactionController';
import TransactionService from '../services/transactionService';
import TransactionValidationSchema from '../validators/transactionValidation';
import AppResponse from '../utils/Response';
import Crypto from '../utils/encrypt.utils';
import moment from 'moment';

// Mock the dependencies
jest.mock('../services/transactionService');
jest.mock('../validators/transactionValidation');
jest.mock('../utils/Response');

const mockTransactionService = new TransactionService() as jest.Mocked<TransactionService>;
const mockValidationSchema = new TransactionValidationSchema() as jest.Mocked<TransactionValidationSchema>;
const mockAppResponse = new AppResponse() as jest.Mocked<AppResponse>;

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    transactionController = new TransactionController();
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
        
      };;
      // @ts-ignore
      mockValidationSchema.validateTransaction.mockReturnValue({ error: null });
      // @ts-ignore
      mockTransactionService.createTransaction.mockResolvedValue(mockTransaction);
      
      await transactionController.createTransaction(req as Request, res as Response, next);

      expect(mockValidationSchema.validateTransaction).toHaveBeenCalledWith(req.body);
      expect(mockTransactionService.createTransaction).toHaveBeenCalledWith({ ...req.body, user_id: req.user.id });
      expect(mockAppResponse.created).toHaveBeenCalledWith(res, mockTransaction);
    });

    it('should handle validation error', async () => {
      const mockError = { message: 'Validation error' };
      // @ts-ignore
      mockValidationSchema.validateTransaction.mockReturnValue({ error: mockError });

      await transactionController.createTransaction(req as Request, res as Response, next);

      expect(mockValidationSchema.validateTransaction).toHaveBeenCalledWith(req.body);
      expect(mockAppResponse.badRequest).toHaveBeenCalledWith(res, { error: { message: mockError.message } });
    });

    it('should handle service error', async () => {
      const mockError = new Error('Service error');
      req.body = { amount: 100 };
      // @ts-ignore
      mockValidationSchema.validateTransaction.mockReturnValue({ error: null });
      mockTransactionService.createTransaction.mockRejectedValue(mockError);
      
      await transactionController.createTransaction(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  // Similarly, write tests for other methods

});
