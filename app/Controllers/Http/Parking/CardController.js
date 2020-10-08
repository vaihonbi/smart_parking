"use strict";
const Card = use("App/Models/Card");

class CardController {
  async index({ view, auth }) {
    const cards = await auth.parking.cards().fetch();

    return view.render("parking.pages.card.index", {
      cards: cards.toJSON(),
    });
  }

  async locked({ view, auth, params }) {
    // await Card.query().update({ is_locked: "0" }).where("id", params.id);
    const a = await Card.find(params.id);
    if (a.is_locked == 1) {
      await Card.query().update({ is_locked: "0" }).where("id", params.id);
    } else {
      await Card.query().update({ is_locked: "1" }).where("id", params.id);
    }

    const cards = await auth.parking.cards().fetch();
    return view.render("parking.pages.card.index", {
      cards: cards.toJSON(),
    });
  }

  async lost() {
    return [];
  }
}

module.exports = CardController;
