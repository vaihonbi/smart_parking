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
    this.app.singleton("Moment", () => this.app.use("moment"));
    this.app.singleton("Lodash", () => this.app.use("lodash"));
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
    const Moment = use("Moment");
    Moment.locale("vi");
  }
}

module.exports = AppProvider;
