"use strict";

class ProfileController {
  async me({ auth }) {
    return auth.user;
  }
}

module.exports = ProfileController;
