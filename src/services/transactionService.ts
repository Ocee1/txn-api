import Transaction from "../models/transactions";

class TransactionService {
  protected model = Transaction;

  public createTransaction = async (data: any) => {
    return await this.model.create(data);
  }

  public getTransactions = async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const transactions = await Transaction.find({ user_id: userId })
      .skip(skip)
      .limit(limit);
    const totalDocuments = await Transaction.countDocuments({ user_id: userId });
    return {
      transactions,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page
    };
  }


  public getTransactionById = async (userId: string, id: string) => {
    return await Transaction.findById({ _id: id, user_id: userId });
  }

  public updateTransaction = async (userId: string, id: string, data: any) => {
    return await this.model.findByIdAndUpdate({ _id: id, user_id: userId }, data, { new: true });
  }

  public deleteTransaction = async (userId: string, id: string) => {
    return await Transaction.findByIdAndDelete({ _id: id, user_id: userId });
  }

  public getTransactionSummary = async (userId: string) => {
    const transactions = await Transaction.find({ user_id: userId });

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.transaction_type === 'credit') {
          acc.totalCredits += transaction.amount;
        } else if (transaction.transaction_type === 'debit') {
          acc.totalDebits += transaction.amount;
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
    const aggregatedData = await this.model.aggregate([
      {
        $match: {
          user_id: userId,
          timestamp: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          totalVolume: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

   
    const chartData = aggregatedData.map((item: any) => ({
      date: item._id,
      volume: item.totalVolume
    }));

    return chartData;
  }
}

export default TransactionService;
