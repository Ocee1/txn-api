// src/cronJobs/reversalCronJob.ts
import { Transfer } from 'models/transfer';
import { Transaction } from '../models/transactions';
import cron from 'node-cron';



cron.schedule('*/10 * * * *', async () => { // Runs every 5 minutes
  console.log('Running cron job to reverse failed transactions');

  try {
    // Fetch failed transactions that need to be reversed
    const failedTransactions = await Transaction.query().where({
      status: 'failed',
      transactionType: 'debit'  // Only reverse debits
    });

    for (const transaction of failedTransactions) {
      
      const txn = await Transaction.query().findOne({ id: transaction.id})

      const data: Partial<Transaction> = {
        senderId: txn.senderId,
        receiverId: txn.receiverId, 
        amount: txn.amount,
        status: 'reversed', 
        transactionType: 'credit', 
      }
      const reversal: Transaction = await Transaction.query().insert(data);


      await Transaction.query().patch({ status: 'completed' }).where({ id: transaction.id });

      console.log(`Reversed transaction ID: ${transaction.id}, created reversal ID: ${reversal.id}`);
    }
  } catch (error) {
    console.error('Error reversing transactions:', error);
  }
});
