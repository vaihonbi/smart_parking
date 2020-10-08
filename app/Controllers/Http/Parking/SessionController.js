"use strict";
const sessions = use("App/Models/Session");
const parking = use("App/Models/Parking");

class SessionController {
  async index({ auth }) {
    const session = await sessions.query().select("*").fetch();
    return session;
  }

  async holding() {
    return [];
  }
}

module.exports = SessionController;
