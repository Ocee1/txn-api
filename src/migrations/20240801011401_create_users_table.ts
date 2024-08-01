import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('emamil').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now()); 
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  })
}



export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

