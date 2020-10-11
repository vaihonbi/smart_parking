"use strict";

class Parking {
  async handle({ request, session, auth, view }, next) {
    const parkingId = request.input("parking_id");
    if (parkingId) {
      session.put("parking_id", parkingId);
    }

    const parkings = await auth.user.parkings().fetch();
    const parking = await auth.user
      .parkings()
      .where((builder) => {
        const parkingId = session.get("parking_id");
        if (parkingId) {
          builder.where("id", parkingId);
        }
      })
      .first();

    if (parking == null) {
      throw new Error("Không có dữ liệu bãi xe!");
    }

    Object.assign(auth, {
      parking,
    });

    view.share({
      parkings: parkings.toJSON(),
      parking: parking.toJSON(),
    });

    await next();
  }
}

module.exports = Parking;
