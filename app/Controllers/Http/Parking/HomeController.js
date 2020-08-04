"use strict";

class HomeController {
  async index({ view }) {
    return view.render("parking.pages.home");
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.route("auth.login");
  }
}

module.exports = HomeController;
