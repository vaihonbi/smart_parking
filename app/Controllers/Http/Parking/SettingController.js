"use strict";

class SettingController {
  async index({ view }) {
    return view.render("parking.pages.config");
  }
}

module.exports = SettingController;
