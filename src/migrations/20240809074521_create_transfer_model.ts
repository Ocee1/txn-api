// migrations/20240808_create_transfers_table.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transfers", (table) => {
    table.increments("id").primary();
    table.string("transactionId").notNullable();
    table.string("amount").notNullable();
    table.string("bank").notNullable();
    table.string("bank_code").notNullable();
    table.string("account_number").notNullable();
    table.string("account_name").notNullable();
    table.string("narration").nullable();
    table.string("reference").notNullable().unique();
    table.enu("transactionType", ["credit", "debit"]).notNullable();
    table.dateTime("createdAt").defaultTo(knex.fn.now());
    table.dateTime("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("transfers");
}
