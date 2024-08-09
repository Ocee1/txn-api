import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', table => {
        table.string('bank').notNullable();
        table.string('accountNumber').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('user', table => {
        table.dropColumn('bank');
        table.dropColumn('accountNumber');
    })
}

