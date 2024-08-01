import { Model } from 'objection';
import knexCon from '../config/db';

Model.knex(knexCon);
export default class BaseModel extends Model{};