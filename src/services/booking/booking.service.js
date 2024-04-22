// add new booking

const models = require("../../models");

// 1-> user books single/multiple room -> new booking entry-> {add all booking description for all rooms [inside booking_description_detail]}
module.exports.addNewBookingDetail = async (data) => {
  try {
    let result = await models.bookingDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "Failure";
  }
};

// cancel reservation
// hotel owner dashboard -> change booking status () by booking id
// 1-> booking status to REFUND_APPROVED -> {delete all rooms booked for that booking id [inside booking_description_service] }
// 2-> booking status to REFUND_CANCELED
module.exports.updateBookingDetail = async (data) => {
  try {
    const [result] = await models.bookingDetailModel.update(
      {
        booking_status: data.booking_status,
      },
      { where: { booking_id: data.booking_id } }
    );
    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
