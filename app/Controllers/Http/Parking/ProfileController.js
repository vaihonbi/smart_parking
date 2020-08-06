"use strict";

class ProfileController {
  async edit({ view, auth }) {
    const user = auth.user;

    return view.render("parking.pages.profile", {
      user: user.toJSON(),
    });
  }
}

module.exports = ProfileController;
