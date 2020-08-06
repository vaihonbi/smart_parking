"use strict";

class ProfileController {
  async edit({ view, auth }) {
    const user = auth.user;
    await user.load("parkings");

    return view.render("parking.pages.profile", {
      user: user.toJSON(),
    });
  }
}

module.exports = ProfileController;
