"use strict";

class CameraController {
  async index({ view, auth }) {
    const cameras = await auth.parking.cameras().fetch();

    return view.render("parking.pages.camera.index", {
      cameras: cameras.toJSON(),
    });
  }
}

module.exports = CameraController;
