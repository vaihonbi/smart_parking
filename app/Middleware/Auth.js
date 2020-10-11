"use strict";

class Auth {
  async handle({ request }, next) {
    await next();
  }
}

module.exports = Auth;
