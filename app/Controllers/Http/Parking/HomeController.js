"use strict";
const Database = use("Database");
const moment = use("Moment");

class HomeController {
  async index({ view, auth }) {
    const card = await Database.from("cards")
      .select("cards.id")
      .where("parking_id", auth.parking.id);

    const cards = [];
    for (let index = 0; index < card.length; index++) {
      cards.push(card[index].id);
    }
    const keyword = "06/10/2020";

    const ngay = [];
    for (let i = 7; i > 0; i--) {
      ngay.push(moment().subtract(i, "days").format("yyyy-MM-DD"));
    }

    const soluong = [];
    for (let i = 0; i < ngay.length; i++) {
      const session = await Database.select("*")
        .from("sessions")
        .whereIn("card_id", cards)
        .where("holded_at", "like", `${ngay[i]}%`);
      soluong.push(session.length);
    }

    return view.render("parking.pages.home", {
      ngay: ngay,
      soluong: soluong,
    });
  }

  async logout({ response, auth }) {
    await auth.logout();

    return response.route("auth.login");
  }
}

module.exports = HomeController;
