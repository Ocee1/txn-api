import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	knex.schema.table('users', table => {
		table.timestamp('deletedAt').nullable();
		table.timestamp('createdAt').nullable();
		table.timestamp('updatedAt').nullable();

	})
}


export async function down(knex: Knex): Promise<void> {
	knex.schema.table('users', table => {
		table.dropColumn('deletedAt');
		table.dropColumn('createdAt');
		table.timestamp('updatedAt');
	})
}

