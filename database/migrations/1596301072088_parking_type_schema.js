"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParkingTypeSchema extends Schema {
  up() {
    this.create("parking_types", (table) => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("parking_types");
  }
}

module.exports = ParkingTypeSchema;
