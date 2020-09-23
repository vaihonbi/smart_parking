"use strict";
const { rule } = use("Validator");
class UpdateUser {
  get validateAll() {
    return true;
  }
  get rules() {
    const userId = this.ctx.params.id;

    return {
      name: "required",
      phone_number: `required|unique:users,phone_number,id,${userId}|integer|phone`,
      email: `email|unique:users,email,id,${userId}`,
    };
  }
  get messages() {
    return {
      "name.required": "Họ tên không được để trống",
      "phone_number.integer": "Số điện thoại không hợp lệ",
      "phone_number.required": "Số điện thoại không hợp lệ",
      "phone_number.unique": "Số điện thoại đã được sử dụng",
      "email.unique": "Email đã được sử dụng",
      "email.email": "Email không hợp lệ",
    };
  }
}

module.exports = UpdateUser;
