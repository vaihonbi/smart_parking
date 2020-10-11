"use strict";
const Session = use("App/Models/Session");
const Card = use("App/Models/Card");
const Database = use("Database");
class HomeController {
  async index({ view, auth }) {
    return view.render("parking.pages.home");
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.route("auth.login");
  }
}

module.exports = HomeController;
