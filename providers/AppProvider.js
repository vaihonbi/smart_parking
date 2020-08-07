"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class AppProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("Moment", () => {
      const Moment = this.app.use("moment");
      Moment.locale("vi");

      return Moment;
    });

    this.app.singleton("Lodash", () => {
      return this.app.use("lodash");
    });
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    //
  }
}

module.exports = AppProvider;
