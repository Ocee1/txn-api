import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Transactions', (table) => {
        table.increments('id').primary();
        table.uuid('userId').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.enu('transaction_type', ['debit', 'credit']).notNullable();
        table.string('description');
        table.timestamp('timestamp').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Transactions');
}

