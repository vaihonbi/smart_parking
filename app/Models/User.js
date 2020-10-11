"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('moment')} */
const Moment = use("Moment");

class User extends Model {
  static get traits() {
    return ["@provider:Adonis/Acl/HasRole"];
  }

  static get computed() {
    return ["is_online"];
  }

  static boot() {
    super.boot();

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  getIsOnline({ last_online_at }) {
    return Moment().diff(Moment(last_online_at), "minutes") < 5;
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }

  parkings() {
    return this.hasMany("App/Models/Parking");
  }
}

module.exports = User;
