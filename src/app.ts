import express, { Application, json } from 'express';
import morgan from 'morgan';
import hpp from 'hpp';
import { logger, stream } from './utils/logger';
import bodyParser, { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { IRoutes } from './interfaces/routes.interface';
import mongoose from 'mongoose';
import { corsOptions, DATABASE_PASSWORD, DATABASE_USER, MONGO_URI, NODE_ENV, PORT } from './config/config';
import errorMiddleware from './middlewares/error';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';
import './services/reversalJob';
import './services/updateTxnJob';


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
class App {
  public app: Application;
  public env: string;
  public port: string | number;
  constructor(routes: IRoutes[]) {
    this.app = express();
    this.env = NODE_ENV|| 'development';
    this.port = PORT || 4000;

    this.initializeMiddlewares();
    this.initalizeErrorHandling();
    this.initializeRoutes(routes);
    // this.connectRMQ();
    // this.initializaDB();
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      logger.info(`================================`);
      logger.info(`========== ENV: ${this.env} =========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`================================`);
    })
  }

  public getServer() {
    return this.app;
  }

  public initializeMiddlewares() {
    this.app.use(morgan('common', { stream }));

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(hpp());

    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(json({ limit: '25mb' }));
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput, { customCssUrl: CSS_URL }));

  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  

  // private async initializaDB() {
  //   try {
  //     const connection = await mongoose.connect(MONGO_URI)
  //     logger.info('======================');
  //     logger.info('MongoDB Connected:', connection.version);
  //     logger.info('======================');

  //   } catch (error) {
  //     logger.error('======================');
  //     logger.error('Mongo Err: ', error);
  //     logger.error('======================')
  //   }
  // }

  private initalizeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;