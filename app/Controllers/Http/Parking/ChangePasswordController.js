"use strict";
const User = use("App/Models/User");
const cURL = use("request-promise");
class ChangePasswordController {
  async changePassword({ view }) {
    return view.render("parking.pages.changepassword");
  }
  async phoneNumber({ request, auth, view }) {
    const phone_number = request.input("phone_number");
    if (phone_number == auth.user.phone_number) {
      // Tao random 6 so tu 0-9
      const chars = "0987654321";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * 10)];
      }

      // Key ESMS
      const apiKey = "B3EAF8B2778E66DC71B758848E58A5";
      const secretKey = "832F8D3644C5BFA602975ED6145F5A";

      // Call API den esms.vn
      const res = await cURL({
        url: `http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get`,
        qs: {
          Phone: phone_number,
          ApiKey: apiKey,
          SecretKey: secretKey,
          Content: `Ma xac minh cua ban la ${code}.`,
          SmsType: 4, // Type cua SMS marketing
          Sandbox: 1, // Tat cai nay de chuyen sang che do production
        },
        json: true,
      });

      // Luu lai ma OTP theo USER
      await User.query()
        .where("phone_number", phone_number)
        .update({ otp: code });

      // Neu field CodeResult === 100 thi la thanh cong, nguoc lai thi bi loi~
      if (res.CodeResult == 100) {
        return view.render("parking.pages.verifyOtp");
      }
    }
    return "sai";
  }
  async verifyOtp({ request, auth, view }) {
    const otp = request.input("otp");
    if (otp == auth.user.otp) {
      return view.render("parking.pages.newPassword");
    } else {
      console.log("otp sai");
    }
    return otp;
  }
}

module.exports = ChangePasswordController;
