"use strict";
const Camera = use("App/Models/Camera");

class CameraController {
  async index({ view, auth }) {
    const cameras = await auth.parking.cameras().fetch();

    return view.render("parking.pages.camera.index", {
      cameras: cameras.toJSON(),
    });
  }

  async show({ params, view }) {
    const camera = await Camera.find(params.id);

    return view.render("parking.pages.camera.show", {
      camera: camera.toJSON(),
    });
  }
}

module.exports = CameraController;
