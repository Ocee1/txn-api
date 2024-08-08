import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/transactionService";
import TransactionValidationSchema from "../validators/transactionValidation";
import AppResponse from "../utils/Response";
import Crypto from "../utils/encrypt.utils";
import moment from "moment";
import UserService from "../services/userService";
import { ATLAS_SECRET, atlasConfig, CREATE_TRANSFER_URL, GET_ACCOUNT_URL } from "../config/config";
import axios from "axios";
import { Transaction } from "../models/transactions";
import { Transfer } from "../models/transfer";

class TransactionController {
  protected transactionService = new TransactionService();
  protected userService = new UserService();
  protected validation = new TransactionValidationSchema();
  protected response = new AppResponse();

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { body, user } = req;
    const { amount, transactionType, receiverId, transactionPin, account_number, bank_code, narration, reference } = req.body;

    try {
      const { error } = this.validation.validateTransaction(body);
      if (error) return this.response.badRequest(res, { error: { message: error.message } });

      const verifyPin = await this.verifyTransactionPin(user.id, transactionPin);
      if (!verifyPin) return this.response.notAuthorized(res, { error: { message: "Incorrect transaction pin" } });

      const sender = await this.userService.getUserById(user.id);
      const receiver = await this.userService.getUserById(receiverId);

      const { balance } = await this.transactionService.getTransactionSummary(sender.id);
      if (balance < amount) return this.response.badRequest(res, { error: { message: 'Insufficient funds' } });

      const accountInfo = await axios(atlasConfig({ bank: receiver.bank, account_number: receiver.account_number }, GET_ACCOUNT_URL, 'post', ATLAS_SECRET));
      if (accountInfo.data.status !== 'success') return this.response.badRequest(res, { error: { message: 'Account not found' } });
      const data = {
        senderId: user.id,
        receiverId,
        transactionType,
        amount,
        description: narration,
        status: 'pending',
        balanceBefore: balance,
      }

      const payload = {
        status: 'pending',
        balanceBefore: balance,
        amount,
        bank: accountInfo.data.data,
        bank_code,
        account_number,
        account_name: accountInfo.data.account_name,
        narration,
        reference,
        transactionType
      };

      const result = await Transaction.transaction(async (txn) => {
        const transaction = await this.transactionService.createTransaction(payload);

        const transfer = await Transfer.query(txn).insert({
          transactionId: transaction.id,
          ...payload
        });
      })


      this.response.created(res, 'Transaction created successfully');
    } catch (error) {
      next(error);
    }
  }

  public getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    const { query, user } = req;
    try {
      const page = parseInt(query.page as string) || 1;
      const limit = parseInt(query.limit as string) || 10;
      const transactionsData = await this.transactionService.getTransactions(user.id, page, limit);

      this.response.success(res, transactionsData);

    } catch (error) {
      next(error);
    }
  }

  public getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    const { params, user } = req;
    try {
      const transaction = await this.transactionService.getTransactionById(user.id, params.id);
      if (transaction) {
        this.response.success(res, transaction);
      } else {
        this.response.notFound(res, { error: { message: 'Transaction not found' } });
      }
    } catch (error) {
      next(error);
    }
  }

  public updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { body, params, user } = req;

    try {
      await this.transactionService.updateTransaction(user.id, params.id, body);

      this.response.accepted(res, { message: 'Transaction update queued for processing.' })

    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req: Request, res: Response, next: NextFunction) {
    const { params, user } = req;
    try {
      const transaction = await this.transactionService.deleteTransaction(user.id, params.id);
      if (transaction) {
        this.response.success(res, 'transaction');
      } else {
        this.response.success(res, { error: { message: 'Transaction not found' } });
      }
    } catch (error) {
      next(error);
    }
  }

  public getTransactionSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await this.transactionService.getTransactionSummary(req.user.id);
      this.response.success(res, summary);
    } catch (error) {
      next(error);
    }
  }

  async getHistoricalTransactionVolume(req: Request, res: Response, next: NextFunction) {
    const { user, query } = req;
    try {
      const { startDate, endDate } = query as { startDate: string, endDate: string };
      const userId = user.id;


      if (!startDate || !endDate || !moment(startDate, moment.ISO_8601, true).isValid() || !moment(endDate, moment.ISO_8601, true).isValid()) {
        return this.response.badRequest(res, { message: 'Invalid date range. Please provide valid ISO date strings for startDate and endDate.' });
      }

      const chartData = await this.transactionService.getHistoricalTransactionVolume(userId, new Date(startDate), new Date(endDate));
      res.status(200).json(chartData);
    } catch (error) {
      next(error);
    }
  }

  public verifyTransactionPin = async (userId: string, transactionPin: string): Promise<boolean> => {
    const user = await this.userService.getUserById(userId)
    if (!user || !user.transactionPin) {
      throw new Error('Transaction pin not set');
    }
    return Crypto.compareStrings(user.transactionPin, transactionPin);
  }
}

export default TransactionController;

