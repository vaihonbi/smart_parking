"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.create("sessions", (table) => {
      table.increments();
      table.text("cost");
      table.text("image_url");
      table.datetime("holded_at");
      table.datetime("returned_at");
      table
        .enum("status", ["holding", "returned", "lost"])
        .defaultTo("holding");
      table
        .integer("parking_type_id")
        .unsigned()
        .references("id")
        .on("parking_types")
        .onDelete("cascade");
      table
        .integer("card_id")
        .unsigned()
        .references("id")
        .on("cards")
        .onDelete("cascade");
      table.boolean("is_longterm").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("sessions");
  }
}

module.exports = SessionSchema;
