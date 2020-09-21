"use strict";

const { rule } = use("Validator");

class StoreUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required",
      phone_number: "required|unique:users|integer|phone",
      email: "email|unique:users",
      password: [
        "required",
        "min:6",
        "max:20",
        rule(
          "regex",
          new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$")
        ),
        "confirmed",
      ],
    };
  }

  get messages() {
    return {
      "name.required": "Họ tên không được để trống",
      "phone_number.integer": "Số điện thoại không hợp lệ",
      "phone_number.unique": "Số điện thoại đã được sử dụng",

      "password.min": "Mật khẩu tối thiểu phải có 6 ký tự",
    };
  }
}

module.exports = StoreUser;
