"use strict";

const Parking = use("App/Models/Parking");
// const database=use()
class SettingController {
  async index({ view }) {
    return view.render("parking.pages.config");
  }
  async update({ params }) {
    const id = params.id;
    const a = await Parking.find(id);
    const active = a.is_active;
    if (active == 1) {
      await Parking.query().update({ is_active: "0" }).where("id", id);
    } else {
      await Parking.query().update({ is_active: "1" }).where("id", id);
    }
  }
}

module.exports = SettingController;
