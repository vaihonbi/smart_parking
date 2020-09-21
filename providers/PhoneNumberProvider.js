"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

class PhoneNumberProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
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
    const Validator = use("Validator");

    const phoneNumberFn = async (data, field, message, args, get) => {
      const value = get(data, field);
      if (!value) {
        return;
      }

      const phoneNumber = parsePhoneNumberFromString(value, "VN");

      if (!phoneNumber.isValid()) {
        throw "Số điện thoại không hợp lệ";
      }
    };

    Validator.extend("phone", phoneNumberFn);
  }
}

module.exports = PhoneNumberProvider;
