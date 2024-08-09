// migrations/20240808_create_transactions_table.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("transactions", (table) => {
    table.integer("senderId").notNullable().references("id").inTable("users").onDelete("CASCADE").alter();
    table.string("receiverId").notNullable().references("id").inTable("users").onDelete("CASCADE").alter();
    table.enu("status", ["pending", "completed", "failed", "reversed"]).notNullable().alter();
    table.enu("transactionType", ["credit", "debit"]).notNullable().alter();
    table.string("description").nullable().alter();
    table.string("balanceBefore").nullable().alter();
    table.string("balanceAfter").nullable().alter();
    table.dateTime("createdAt").defaultTo(knex.fn.now()).alter();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("transactions", (table) => {
    table.dropColumn("senderId");
    table.dropColumn("receiverId");
    table.dropColumn("status");
    table.dropColumn("transactionType")
    table.dropColumn("description");
    table.dropColumn("balanceBefore");
    table.dropColumn("balanceAfter");
    table.dropColumn("createdAt");
    table.dropColumn("updatedAt");
  });
}
