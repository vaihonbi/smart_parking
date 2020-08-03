"use strict";

const Schema = use("Schema");

class PermissionSchema extends Schema {
  up() {
    this.create("permissions", (table) => {
      table.increments();
      table.string("slug").notNullable().unique();
      table.string("name").notNullable().unique();
      table.text("description");
      table.timestamps();
    });

    this.create("permission_user", (table) => {
      table.increments();
      table
        .integer("permission_id")
        .unsigned()
        .references("id")
        .on("permissions")
        .onDelete("cascade");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .on("users")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("permission_user");
    this.drop("permissions");
  }
}

module.exports = PermissionSchema;
