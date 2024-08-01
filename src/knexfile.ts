import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from 'config/config';
import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: 'txn-db'
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