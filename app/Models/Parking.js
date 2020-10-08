"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Parking extends Model {
  types() {
    return this.belongsToMany("App/Models/ParkingType");
  }

  cameras() {
    return this.hasMany("App/Models/Camera");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  users() {
    return this.belongsToMany("App/Models/User");
  }

  cards() {
    return this.hasMany("App/Models/Card");
  }

  session() {
    return this.belongsTo("App/Models/Session");
  }

  sessions() {
    return this.belongsToMany("App/Models/Session");
  }
}

module.exports = Parking;
