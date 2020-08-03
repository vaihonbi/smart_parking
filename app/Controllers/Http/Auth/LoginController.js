"use strict";

class LoginController {
  async showLogin({ view }) {
    return view.render("auth.login");
  }

  async login({ request, response, auth }) {
    const uid = request.input("phone_number");
    const password = request.input("password");
    const remember = request.input("remember") == "on";

    // Kiểm chứng thông tin
    const user = await auth.remember(remember).attempt(uid, password);
    await user.load("roles");

    // Kiểm tra rule để chuyến hướng
    const currentUser = user.toJSON();
    if (currentUser.roles.length > 0) {
      switch (currentUser.roles[0].slug) {
        case "owner":
          return response.route("parking.home");
        case "admin":
          return response.route("admin.home");
        default:
          break;
      }
    }

    // Đăng xuất ngay nếu lỗi
    await auth.logout();

    throw new Error("Không rõ nguyên nhân!");
  }
}

module.exports = LoginController;
