"use strict";

const Session = use("App/Models/Session");
const Database = use("Database");

class SessionController {
  async index({ request }) {
    // Danh sách phiên gửi xe hiện tại
    // Điều kiện lọc truy vấn sql
    // status = holding
    // created_at = today
    // thuộc bãi gửi xe mà nhân viên đang làm việc

    const page = request.input("page", 1);
    const keyword = request.input("keyword");
    const phone_number = request.input("phone_number");

    const user = await Database.select("id")
      .from("users")
      .where("phone_number", phone_number);

    const parking = await Database.select("parking_id")
      .from("parking_user")
      .where("user_id", user[0].id);

    const card = await Database.from("cards")
      .select("cards.id")
      .where("parking_id", parking[0].parking_id);

    const cards = [];
    for (let index = 0; index < card.length; index++) {
      cards.push(card[index].id);
    }

    return await Session.query()
      .where((builder) => {
        // Nếu có truyền vào từ khóa thì mới thực hiện thêm câu truy vấn
        // AND WHERE `number_plate` LIKE '%(key)%'
        if (keyword) {
          builder.where("number_plate", "like", `%${keyword}%`);
        }
        builder.whereIn("card_id", cards);

        // Các điều kiện khác ở đây
        // ...
      })
      .paginate(page);
  }

  async store() {
    // Lưu thông tin biển số khi bên ứng dụng Android thực hiện lệnh gửi thông tin
    // khi chụp biển số xe

    return { success: true };
  }

  async show({ params }) {
    // Hiển thị thông tin của một biên gửi xe dựa vào id
    // params.id

    return { success: true };
  }

  async update({ params }) {
    // Cập nhật lại trạng thái phiên gửi xe, ví dụ từ đang gửi thành đã trả
    // params.id

    return { success: true };
  }
}

module.exports = SessionController;
