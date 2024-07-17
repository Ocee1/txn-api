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

    
/**
     * @swagger
     * /transactions:
     *   post:
     *     summary: Create a new transaction
     *     tags: [Transactions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_id:
     *                 type: string
     *               amount:
     *                 type: number
     *               transaction_type:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: The transaction was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     *       400:
     *         description: Bad Request
     */

    this.router.post('/transactions', this.auth.authorize, this.transactionController.createTransaction);
 /**
     * @swagger
     * /transactions:
     *   get:
     *     summary: Returns the list of all transactions for the authenticated user
     *     tags: [Transactions]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         description: The page number for pagination
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: The number of items per page
     *     responses:
     *       200:
     *         description: The list of transactions
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Transaction'
     *       401:
     *         description: Unauthorized
     */

    this.router.get('/transactions', this.auth.authorize, this.transactionController.getTransactions);
   /**
     * @swagger
     * /transactions/{id}:
     *   get:
     *     summary: Get the transaction by id
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The transaction id
     *     responses:
     *       200:
     *         description: The transaction description by id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     *       404:
     *         description: The transaction was not found
     *       401:
     *         description: Unauthorized
     */

    this.router.get('/transactions/:id', this.auth.authorize, this.transactionController.getTransactionById);
    
/**
     * @swagger
     * /transactions/{id}:
     *   patch:
     *     summary: Update the transaction by id
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The transaction id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               amount:
     *                 type: number
     *               transaction_type:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: The transaction was successfully updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     *       404:
     *         description: The transaction was not found
     *       401:
     *         description: Unauthorized
     *       400:
     *         description: Bad Request
     */

    this.router.patch('/transactions/:id', this.auth.authorize, this.transactionController.updateTransaction);
    /**
     * @swagger
     * /transactions/{id}:
     *   delete:
     *     summary: Delete the transaction by id
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The transaction id
     *     responses:
     *       200:
     *         description: The transaction was successfully deleted
     *       404:
     *         description: The transaction was not found
     *       401:
     *         description: Unauthorized
     */

    this.router.delete('/transactions/:id', this.auth.authorize, this.transactionController.deleteTransaction);

    /**
     * @swagger
     * /transactions-summary:
     *   get:
     *     summary: Get a summary of transactions (total credits, total debits, balance) for the authenticated user
     *     tags: [Transactions]
     *     responses:
     *       200:
     *         description: The summary of transactions
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 totalCredits:
     *                   type: number
     *                 totalDebits:
     *                   type: number
     *                 balance:
     *                   type: number
     *       401:
     *         description: Unauthorized
     */


    this.router.get('/transactions-summary', this.auth.authorize, this.transactionController.getTransactionSummary);

    /**
     * @swagger
     * /historical-transaction-volume:
     *   get:
     *     summary: Get historical chart data for transaction volume
     *     tags: [Transactions]
     *     responses:
     *       200:
     *         description: The historical chart data for transaction volume
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 dates:
     *                   type: array
     *                   items:
     *                     type: string
     *                     format: date
     *                 volumes:
     *                   type: array
     *                   items:
     *                     type: number
     *       401:
     *         description: Unauthorized
     */
    this.router.get('/historical-transaction-volume', this.auth.authorize, this.transactionController.getHistoricalTransactionVolume);
  }
}

export default TransactionRouter;

