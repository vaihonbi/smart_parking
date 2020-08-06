"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CameraSchema extends Schema {
  up() {
    this.create("cameras", (table) => {
      table.increments();
      table.string("name");
      table.text("thumb_url");
      table.text("stream_url");
      table
        .integer("parking_id")
        .unsigned()
        .references("id")
        .on("parkings")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("cameras");
  }
}

module.exports = CameraSchema;
