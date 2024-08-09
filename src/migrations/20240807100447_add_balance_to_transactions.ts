import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('transactions', table => {
        table.enu('status', ['pending', 'completed']);
        table.string('balanceBefore').notNullable();
        table.string('balanceAfter').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('transactions', table => {
        table.dropColumn('status');
        table.dropColumn('balanceBefore');
        table.dropColumn('balanceAfter');
    })
}

