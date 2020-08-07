"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionSchema extends Schema {
  up() {
    this.create("transactions", (table) => {
      // table.increments();
      table.uuid("id").primary();
      table.enum("gateway", ["local", "momo"]).defaultTo("local");
      table.integer("amount");
      table
        .integer("session_id")
        .unsigned()
        .references("id")
        .on("sessions")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("transactions");
  }
}

module.exports = TransactionSchema;
