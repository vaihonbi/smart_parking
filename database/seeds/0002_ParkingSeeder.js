"use strict";

/*
|--------------------------------------------------------------------------
| ParkingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('../../app/Models/ParkingType')} */
const ParkingType = use("App/Models/ParkingType");

/** @type {typeof import('../../app/Models/Parking')} */
const Parking = use("App/Models/Parking");

class ParkingSeeder {
  async run() {
    await ParkingType.createMany([
      {
        id: 1,
        name: "Xe Đạp",
      },
      {
        id: 2,
        name: "Xe Máy",
      },
      {
        id: 3,
        name: "Xe Ôtô",
      },
      {
        id: 4,
        name: "Xe Tải",
      },
    ]);

    const parkings = await Parking.createMany([
      {
        name: "FPT Polytechnic",
        phone_number: "0987654321",
        email: "fpt@email.com",
        user_id: 3,
      },
      {
        name: "ST47",
        phone_number: "0987654322",
        email: "st47@email.com",
        user_id: 3,
      },
    ]);

    await parkings[0].types().sync([1, 2, 3]);
    await parkings[1].types().sync([1, 2, 3, 4]);
  }
}

module.exports = ParkingSeeder;
