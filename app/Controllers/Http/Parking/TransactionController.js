"use strict";

class TransactionController {
  async index({ view }) {
    return view.render("parking.pages.transaction.index");
  }

  async show() {
    //
  }
}

module.exports = TransactionController;
