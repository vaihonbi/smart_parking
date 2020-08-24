"use strict";

class ProfileController {
  async edit({ view, auth }) {
    const user = auth.user;

    return view.render("parking.pages.profile", {
      user: user.toJSON(),
    });
  }

  async update({ request, response, session, auth }) {
    const payload = request.only(["name", "email"]);
    const user = auth.user;

    user.merge(payload);
    await user.save();

    return response.route("parking.profile");
  }
}

module.exports = ProfileController;
