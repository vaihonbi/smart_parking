"use strict";

class HomeController {
  async index({ view }) {
    return view.render("admin.pages.home");
  }
}

module.exports = HomeController;
