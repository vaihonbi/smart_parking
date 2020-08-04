"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParkingCostSchema extends Schema {
  up() {
    this.create("parking_costs", (table) => {
      table.increments();
      table.integer("daytime");
      table.integer("night");
      table.integer("month");
      table
        .integer("parking_id")
        .unsigned()
        .references("id")
        .on("parkings")
        .onDelete("cascade");
      table
        .integer("parking_type_id")
        .unsigned()
        .references("id")
        .on("parking_types")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("parking_costs");
  }
}

module.exports = ParkingCostSchema;
