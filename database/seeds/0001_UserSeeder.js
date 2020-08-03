"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('adonis-acl/src/Models/Role')} */
const Role = use("Role");

/** @type {typeof import('../../app/Models/User')} */
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    await Role.createMany([
      {
        id: 1,
        name: "Quản trị viên",
        slug: "admin",
      },
      {
        id: 2,
        name: "Chủ bãi xe",
        slug: "owner",
      },
      {
        id: 3,
        name: "Nhân viên",
        slug: "employee",
      },
    ]);

    const users = await User.createMany([
      {
        id: 1,
        name: "Trùm Cuối",
        phone_number: "0987654320",
        password: "1234qwer",
      },
      {
        id: 2,
        name: "Trùm Phụ",
        phone_number: "0987654321",
        password: "1234qwer",
      },
      // Bãi B
      {
        id: 3,
        name: "Bãi Xe A",
        phone_number: "0987654322",
        password: "1234qwer",
      },
      {
        id: 4,
        name: "Nhân Viên 1 Bãi A",
        phone_number: "0987654323",
        password: "1234qwer",
      },
      {
        id: 5,
        name: "Nhân Viên 2 Bãi A",
        phone_number: "0987654324",
        password: "1234qwer",
      },
      // Bãi B
      {
        id: 6,
        name: "Bãi Xe B",
        phone_number: "0987654325",
        password: "1234qwer",
      },
      {
        id: 7,
        name: "Nhân Viên 1 Bãi B",
        phone_number: "0987654326",
        password: "1234qwer",
      },
      {
        id: 8,
        name: "Nhân Viên 2 Bãi B",
        phone_number: "0987654327",
        password: "1234qwer",
      },
    ]);

    await users[0].roles().sync([1]);
    await users[1].roles().sync([1]);
    await users[2].roles().sync([2]);
    await users[3].roles().sync([3]);
    await users[4].roles().sync([3]);
    await users[5].roles().sync([2]);
    await users[6].roles().sync([3]);
    await users[7].roles().sync([3]);
  }
}

module.exports = UserSeeder;
