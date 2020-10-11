"use strict";

const cURL = use("request-promise");
const User = use("App/Models/User");
class ForgotPasswordController {
  async forgotPassword({ request }) {
    const phoneNumber = request.input("phone_number");

    const user = await User.query().where("phone_number", phoneNumber).first();

    if (!user) {
      throw new Error("Loi~ roi ban oi!!1");
    }

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
        Phone: phoneNumber,
        ApiKey: apiKey,
        SecretKey: secretKey,
        Content: `Ma xac minh cua ban la ${code}.`,
        SmsType: 4, // Type cua SMS marketing
        Sandbox: 1, // Tat cai nay de chuyen sang che do production
      },
      json: true,
    });

    // Luu lai ma OTP theo USER
    user.merge({ otp: code });
    await user.save();

    // Neu field CodeResult === 100 thi la thanh cong, nguoc lai thi bi loi~
    if (res.CodeResult == 100) {
      return {
        success: true,
      };
    }

    return {
      error: "khong the gui ma xac minh.",
    };
  }

  async verifyOTP({ request }) {
    const phoneNumber = request.input("phone_number");
    const code = request.input("code");

    // Lay thong tin user theo so dien thoai
    const user = await User.query().where("phone_number", phoneNumber).first();

    // Kiem tra OTP gui tu Android len == voi otp da luu trong field otp cua table users
    if (user.otp != code) {
      throw new Error("Ma xac minh khong chinh xac");
    }

    // Remove cai otp hien tai cua user sau khi da xac minh thanh cong
    user.merge({
      otp: null,
    });
    await user.save();

    // Neu hoan thanh cac buoc thi bao thanh cong de
    // Android chuyen sang man hinh nhap mat khau moi'
    return { success: true };
  }
  // Update mat khau moi
  async newPassword({ request }) {
    const phoneNumber = request.input("phone_number");
    const newpass = request.input("new_password");

    // console.log(phoneNumber, newpass);
    const user = await User.query().where("phone_number", phoneNumber).first();
    //update mk
    user.merge({
      password: newpass,
    });
    await user.save();

    return { success: true };
  }
}

module.exports = ForgotPasswordController;
