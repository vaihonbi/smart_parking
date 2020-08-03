"use strict";

class AllowGuestOnly {
  async handle({ request }, next) {
    await next();
  }
}

module.exports = AllowGuestOnly;
