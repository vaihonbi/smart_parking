"use strict";

class UserOnline {
  async handle({ auth }, next) {
    const user = auth.user;
    user.merge({
      last_online_at: new Date(),
    });
    await user.save();

    await next();
  }
}

module.exports = UserOnline;
