import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/transactionService";
import TransactionValidationSchema from "../validators/transactionValidation";
import AppResponse from "../utils/Response";
import Crypto from "../utils/encrypt.utils";
import moment from "moment";

class TransactionController {
  protected transactionService = new TransactionService();
  protected validation = new TransactionValidationSchema();
  protected response = new AppResponse();

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { body, user } = req;
    try {
      const { error } = this.validation.validateTransaction(body);
      if (error) return this.response.badRequest(res, { error: { message: error.message } })
      const data = {
        ...body,
        user_id: req.user.id
      };
      const transaction = await this.transactionService.createTransaction(data);
      this.response.created(res, transaction)
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

      this.response.success(res, transactionsData)

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
        this.response.success(res, transaction);
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

      // Validate dates (ensure they are valid ISO date strings)
      if (!startDate || !endDate || !moment(startDate, moment.ISO_8601, true).isValid() || !moment(endDate, moment.ISO_8601, true).isValid()) {
        return this.response.badRequest(res, { message: 'Invalid date range. Please provide valid ISO date strings for startDate and endDate.' });
      }

      const chartData = await this.transactionService.getHistoricalTransactionVolume(userId, new Date(startDate), new Date(endDate));
      res.status(200).json(chartData);
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;