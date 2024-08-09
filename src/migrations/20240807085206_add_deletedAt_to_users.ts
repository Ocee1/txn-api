import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users', table => {
        table.timestamp('deletedAt').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users', table => {
        table.dropColumn('deletedAt');
    })
}

