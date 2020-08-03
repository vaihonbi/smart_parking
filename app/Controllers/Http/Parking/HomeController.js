"use strict";

class HomeController {
  async index({ view }) {
    return view.render("parking.pages.home");
  }
}

module.exports = HomeController;
