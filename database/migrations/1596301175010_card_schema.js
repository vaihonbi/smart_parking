"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CardSchema extends Schema {
  up() {
    this.create("cards", (table) => {
      table.increments();
      table.text("serial_number").unique();
      table
        .integer("parking_id")
        .unsigned()
        .references("id")
        .on("parkings")
        .onDelete("cascade");
      table.bool("is_lost").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("cards");
  }
}

module.exports = CardSchema;
