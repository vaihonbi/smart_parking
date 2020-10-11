"use strict";

class LoginController {
  async login({ request, auth }) {
    const uid = request.input("phone_number");
    const password = request.input("password");

    return await auth.authenticator("jwt").attempt(uid, password);
  }
}

module.exports = LoginController;
