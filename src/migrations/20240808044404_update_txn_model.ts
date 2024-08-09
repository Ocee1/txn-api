import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('transactions', (table) => {
    table.string('narration').nullable();
    
    table.string('bank_code').notNullable();
    table.string('account_name').notNullable();
    table.string('account_number').notNullable();
    table.string('reference').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('transfers', (table) => {
    table.dropColumn('narration');
    table.dropColumn('bank_code');
    table.dropColumn('account_name');
    table.dropColumn('account_number');
    table.dropColumn('reference');
  });
}
