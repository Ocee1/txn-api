import dotenv from 'dotenv';
dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
export const LOG_DIR = process.env.LOG_DIR ;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const MONGO_URI = process.env.MONGO_URI;
export const RMQ_URL = process.env.RMQ_URL;
export const RMQ_PORT = process.env.RMQ_PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PASSWORD = process.env.PASSWORD;
export const DATABASE_PORT = process.env.PORT;


export const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: 'Content-Type,Authorization', 
  credentials: true, 
};


export const SERVER = {
  SERVER_HOSTNAME,
  PORT
}
