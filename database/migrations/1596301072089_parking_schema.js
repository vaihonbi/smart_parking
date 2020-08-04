"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParkingSchema extends Schema {
  up() {
    this.create("parkings", (table) => {
      table.increments();
      table.string("name");
      table.string("phone_number");
      table.string("email");
      table.text("address");
      table.text("logo_url");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .on("users")
        .onDelete("cascade");
      table.datetime("expired_at");
      table.boolean("is_active").defaultTo(true);
      table.timestamps();
    });

    this.create("parking_parking_type", (table) => {
      table.increments();
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
    });
  }

  down() {
    this.drop("parking_parking_type");
    this.drop("parkings");
  }
}

module.exports = ParkingSchema;
