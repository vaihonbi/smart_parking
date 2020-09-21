"use strict";
const { rule } = use("Validator");
class UpdateUser {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      name: "required",
      phone_number: "required|unique:users|integer|phone",
      email: "email|unique:users",
    };
  }
  get messages() {
    return {
      "name.required": "Họ tên không được để trống",
      "phone_number.integer": "Số điện thoại không hợp lệ",
      "phone_number.unique": "Số điện thoại đã được sử dụng",
    };
  }
}

module.exports = UpdateUser;
