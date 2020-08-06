"use strict";

/*
|--------------------------------------------------------------------------
| CameraSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('../../app/Models/Camera')} */
const Camera = use("App/Models/Camera");

class CameraSeeder {
  async run() {
    await Camera.createMany([
      {
        id: 1,
        name: "Camera 1",
        parking_id: 1,
      },
      {
        id: 2,
        name: "Camera 2",
        parking_id: 1,
      },
    ]);
  }
}

module.exports = CameraSeeder;
