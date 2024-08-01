import { Model } from 'objection';
import knex from 'config/db';

Model.knex(knex);
export default class BaseModel extends Model{};