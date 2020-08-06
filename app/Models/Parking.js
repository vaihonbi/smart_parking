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
}

module.exports = Parking;
