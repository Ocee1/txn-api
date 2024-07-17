import { Router } from 'express';
import { IRoutes } from '../interfaces/routes.interface';
import UserController from '../controllers/userController';
import TransactionController from '../controllers/transactionController';
import Auth from '../middlewares/auth';


class TransactionRouter implements IRoutes {
  public path = '/transactions';
  public router = Router();
  private transactionController: TransactionController = new TransactionController();
  private auth = new Auth();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/transactions', this.auth.authorize, this.transactionController.createTransaction);
    this.router.get('/transactions', this.auth.authorize, this.transactionController.getTransactions);
    this.router.get('/transactions/:id', this.auth.authorize, this.transactionController.getTransactionById);
    this.router.patch('/transactions/:id', this.auth.authorize, this.transactionController.updateTransaction);
    this.router.delete('/transactions/:id', this.auth.authorize, this.transactionController.deleteTransaction);
    this.router.get('/transactions-summary', this.auth.authorize, this.transactionController.getTransactionSummary);
    this.router.get('/historical-transaction-volume', this.auth.authorize, this.transactionController.getHistoricalTransactionVolume);
  }
}

export default TransactionRouter;

