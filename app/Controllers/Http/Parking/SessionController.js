"use strict";
const Session = use("App/Models/Session");
//const parking = use("App/Models/Parking");
const Database = use("Database");
/** @type {import('moment')} */
const moment = use("Moment");

class SessionController {
  async index({ auth, view, request }) {
    const keyword = request.input("keyword", "");
    const page = request.input("page", 1);
    const sapxep = request.input("sapxep", "holded_at");
    const sapxeptheo = request.input("sapxeptheo", "desc");

    const card = await Database.from("cards")
      .select("cards.id")
      .where("parking_id", auth.parking.id);

    const cards = [];
    for (let index = 0; index < card.length; index++) {
      cards.push(card[index].id);
    }

    const session = await Database.select("*")
      .from("sessions")
      .innerJoin("cards", "sessions.card_id", "cards.id")
      .innerJoin(
        "parking_types",
        "sessions.parking_type_id",
        "parking_types.id"
      )
      .where((builder) => {
        if (keyword) {
          builder
            .orWhere("number_plate", "like", `%${keyword}%`)
            .orWhere("name", "like", `%${keyword}%`);
        }
        builder.whereIn("card_id", cards);
      })
      .orderBy(sapxep, sapxeptheo)
      .paginate(page, 4);

    for (let index = 0; index < session.data.length; index++) {
      session.data[index].holded_at = moment(
        session.data[index].holded_at
      ).format("L LTS");
      session.data[index].returned_at = moment(
        session.data[index].returned_at
      ).format("L LTS");
    }

    return view.render("parking.pages.session.index", {
      sessions: session,
      page: page,
      keyword: keyword,
      sapxep,
      sapxeptheo,
    });
  }

  async holding({ auth, view, request }) {
    const keyword = request.input("keyword", "");
    const page = request.input("page", 1);
    const sapxep = request.input("sapxep", "holded_at");
    const sapxeptheo = request.input("sapxeptheo", "desc");

    const card = await Database.from("cards")
      .select("cards.id")
      .where("parking_id", auth.parking.id);

    const cards = [];
    for (let index = 0; index < card.length; index++) {
      cards.push(card[index].id);
    }

    const session = await Database.select("*")
      .from("sessions")
      .innerJoin("cards", "sessions.card_id", "cards.id")
      .innerJoin(
        "parking_types",
        "sessions.parking_type_id",
        "parking_types.id"
      )
      .where((builder) => {
        if (keyword) {
          builder
            .orWhere("number_plate", "like", `%${keyword}%`)
            .orWhere("name", "like", `%${keyword}%`);
        }
        builder.whereIn("card_id", cards);
      })
      .where("status", "holding")
      .orderBy(sapxep, sapxeptheo)
      .paginate(page, 4);

    for (let index = 0; index < session.data.length; index++) {
      session.data[index].holded_at = moment(
        session.data[index].holded_at
      ).format("L LTS");
      session.data[index].returned_at = moment(
        session.data[index].returned_at
      ).format("L LTS");
    }

    return view.render("parking.pages.session.holding", {
      sessions: session,
      page: page,
      keyword: keyword,
      sapxep,
      sapxeptheo,
    });
  }
}

module.exports = SessionController;
