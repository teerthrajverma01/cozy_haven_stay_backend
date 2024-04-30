const db = require("../../config/dbconfig");
const models = require("../../models/index");

// add new hotel_detail
// 1-> hotelownerdashboard addnew hotel (ifnotexist)->hotelowner adds new hotel
module.exports.addNewHotel = async (data) => {
  try {
    let result = await models.hotelDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update exsiting hotel_detail by id
// 1-> hotelownerdashboard update hotel detail (ifexist)->hotelowner updates existing hotel
module.exports.updateHotelDetail = async (data) => {
  try {
    const [result] = await models.hotelDetailModel.update(
      {
        hotel_name: data.hotel_name,
        location: data.location,
        address: data.address,
        parking: data.parking,
        wifi: data.wifi,
        room_service: data.room_service,
        swimming_pool: data.swimming_pool,
        fitness_center: data.fitness_center,
        dining: data.dining,
      },
      {
        where: {
          hotel_id: data.hotel_id,
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get hotel by hotel_owner id
// 1-> hotelowner dashboard hotel detail-> display hotel detail
module.exports.getHotelDetailById = async (id) => {
  try {
    const result = await models.hotelDetailModel.findOne({
      where: {
        owner_id: id,
      },
    });
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// ******************************************************

// get all hotel by hotel_owner
// 1-> admindashborard -> display all hotels

// get all hotel by hotel location

// get all hotel by (hotelloc+noofrooms+checkindate+checkoutdate)
// 1->home page
