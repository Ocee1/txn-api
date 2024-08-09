import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('users', table => {
		table.string('account_Number').nullable();
	})
}


export async function down(knex: Knex): Promise<void> {
	knex.schema.table('users', table => {
		table.dropColumn('account_number');
	})
}

