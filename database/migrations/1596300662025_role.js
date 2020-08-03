"use strict";

const Schema = use("Schema");

class RoleSchema extends Schema {
  up() {
    this.create("roles", (table) => {
      table.increments();
      table.string("slug").notNullable().unique();
      table.string("name").notNullable().unique();
      table.text("description");
      table.timestamps();
    });

    this.create("permission_role", (table) => {
      table.increments();
      table
        .integer("permission_id")
        .unsigned()
        .references("id")
        .on("permissions")
        .onDelete("cascade");
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .on("roles")
        .onDelete("cascade");
      table.timestamps();
    });

    this.create("role_user", (table) => {
      table.increments();
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .on("roles")
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
    this.drop("role_user");
    this.drop("permission_role");
    this.drop("roles");
  }
}

module.exports = RoleSchema;
