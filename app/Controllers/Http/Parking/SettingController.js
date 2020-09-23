"use strict";
// const Parking = use("App/Models/Parking");
class SettingController {
  async index({ view, session, request, auth }) {
    // const parkings = await auth.user.parkings().fetch();
    return view.render("parking.pages.config");
  }
}

module.exports = SettingController;
