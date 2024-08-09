import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', table => {
    table.string('transaction_pin').nullable();
    table.timestamp('deleted_at').nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', table => {
    table.dropColumn('transaction_pin');
    table.dropColumn('deleted_at');
  })
}

