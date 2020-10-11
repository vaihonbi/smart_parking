"use strict";
const Session = use("App/Models/Session");
class SessionController {
  async index({ view, auth, request }) {
    const parking = auth.parking;
    const keyword = request.input("keyword");
    // const session = await Session.all();
    const session = await Session.query()
      .where((builder) => {
        if (keyword) {
          builder.where("id", "like", `%${keyword}%`);
        }
      })
      .fetch();

    return view.render("parking.pages.session.index", {
      session: session.toJSON(),
    });
  }

  async holding() {
    return [];
  }
}

module.exports = SessionController;
