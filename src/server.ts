import App from './app';
import UserRouter from './routes/user.routes';
import TransactionRouter from './routes/transaction.route';


const app = new App([
  new UserRouter(),
  new TransactionRouter(),
]);

app.listen();