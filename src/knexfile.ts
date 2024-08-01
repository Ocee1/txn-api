import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from './config/config';
import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '10101010',
      database: 'txn-db',
      port: 3306,
    },
    migrations: {
      tableName: 'txn-migrations',
      directory: 'migrations',
    },

    seeds: {
      directory: 'seeds'
    }
  },

}
export default config;