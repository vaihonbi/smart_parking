"use strict";

const _ = use("lodash");
const User = use("App/Models/User");

class UserController {
  async index({ request, view, auth }) {
    await auth.parking.load("users");
    const { users } = auth.parking.toJSON();
    const userIds = _.map(users, (u) => u.id);

    const keyword = request.input("keyword");

    const sapxep = request.input("sapxep", "created_at");
    const sapxeptheo = request.input("sapxeptheo", "desc");
    // const sapxepNgay = request.input("sapxepNgay");
    const users2 = await User.query()
      .whereIn("id", userIds)
      .where((builder) => {
        if (keyword) {
          builder
            .orWhere("name", "like", `%${keyword}%`)
            .orWhere("phone_number", "like", `%${keyword}%`);
        }
      })

      .orderBy(sapxep, sapxeptheo)
      // .orderBy("name", sapxepTen)
      // .orderBy("created_at", sapxepNgay)
      .paginate(request.input("page"), 3);

    return view.render("parking.pages.user.index", {
      users: users2.toJSON(),
      sapxep,
      sapxeptheo,
      // keyword,
      // sapxepID: sapxepID,
      // sapxepTen: sapxepTen,
      // sapxepNgay: sapxepNgay,
    });
  }

  async create({ view }) {
    return view.render("parking.pages.user.create");
  }

  async store({ request, response, auth }) {
    const payload = request.only(["name", "phone_number", "password"]);
    const user = await User.create(payload);

    await auth.parking.load("users");
    await auth.parking.users().attach(user.id);

    return response.route("parking.users.index");
  }

  async show({ params, view, auth }) {
    await auth.parking.load("users", (builder) => {
      builder.where("user_id", params.id).limit(1);
    });

    const { users } = auth.parking.toJSON();
    const user = users[0];
    // // session.put("id", user.id);
    // return view.render("parking.pages.user.show", {
    //   user,
    // });
    return user;
  }

  async edit({ view, params, auth }) {
    await auth.parking.load("users", (builder) => {
      builder.where("user_id", params.id).limit(1);
    });
    const { users } = auth.parking.toJSON();
    const user = users[0];
    // const user = users[0].toJSON;
    // const user = await User.query().where("id", params.id).first();
    return view.render("parking.pages.user.edit", {
      user,
    });
    // return users[0];
  }

  async update({ request, params, response, session }) {
    const payload = request.only(["name", "phone_number"]);
    const user = await User.query().update(payload).where("id", params.id);
    // await auth.parking.load("users");
    // const id = session.get("id");

    return response.route("parking.users.index");
  }

  async destroy({ params, response, session }) {
    const user = await User.query().where("id", params.id).first();

    if (user) {
      await user.delete();
    }

    session.flash({
      notification: `Đã xóa thành công nhân viên ${user.name} !`,
    });
    return response.route("parking.users.index");
  }
}

module.exports = UserController;
