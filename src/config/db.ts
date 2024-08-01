import Knex from 'knex';
import knexConfig from '../knexfile';
import { Model } from 'objection';


const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
const knexCon = Knex(config);

// Model.knex(knex);
export default knexCon;
