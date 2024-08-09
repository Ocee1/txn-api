import { Transaction } from "../models/transactions";

class TransactionService {
  protected model = Transaction;

  public createTransaction = async (data: any) => {
    return await this.model.query().insert(data);
  }

  public getTransactions = async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const transactions = await this.model.query()
      .offset(skip)
      .limit(limit);
    const totalDocuments = await this.model.query().where('userId', userId).resultSize();
    return {
      transactions,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page
    };
  }


  public getTransactionById = async (userId: string, id: string) => {
    return await this.model.query().findOne({ id, userId });
  }

  public updateTransaction = async (userId: string, id: string, data: any) => {
    return await this.model.query().patchAndFetchById(id, { ...data, userId });
  }

  public deleteTransaction = async (userId: string, id: string) => {
    return await this.model.query().delete().where({ id, userId });
  }

  public getTransactionSummary = async (userId: string) => {
    const transactions = await this.model.query().where('senderId', userId).orWhere('receiverId', userId);

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.receiverId === userId) {
          acc.totalCredits += ~~transaction.amount;
        } else if (transaction.senderId === userId) {
          acc.totalDebits += ~~transaction.amount;
        }
        return acc;
      },
      { totalCredits: 0, totalDebits: 0 }
    );

    const balance = summary.totalCredits - summary.totalDebits;

    return {
      totalCredits: summary.totalCredits,
      totalDebits: summary.totalDebits,
      balance: balance
    };
  }

  public getHistoricalTransactionVolume = async (userId: string, startDate: Date, endDate: Date) => {
    const aggregatedData = await this.model.query()
      .where('userId', userId)
      .andWhere('timestamp', '>=', startDate)
      .andWhere('timestamp', '<', endDate)
      .select(this.model.raw('DATE(timestamp) as date'))
      .sum('amount as totalVolume')
      .groupBy('date')
      .orderBy('date', 'asc');

    const chartData = aggregatedData.map((item: any) => ({
      date: item._id,
      volume: item.totalVolume
    }));

    return chartData;
  }
}

export default TransactionService;
