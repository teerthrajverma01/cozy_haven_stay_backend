const db = require("../../config/dbconfig");
const models = require("../../models/index");
const { Sequelize, Op } = require("sequelize");
// const sequelize = require("sequelize");

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
module.exports.getHotelByInput = async (data) => {
  try {
    // find count of all rooms as per hotel where checkinand checkout date lies between input dates
    // use table bookingdetail

    console.log("*******************START*******************");

    const bookedHotels = await models.bookingDetailModel.findAll({
      attributes: [
        "hotel_id",
        [
          Sequelize.fn("SUM", Sequelize.col("no_rooms")),
          "total_noof_bookedrooms",
        ],
      ],
      where: {
        checkin_date: {
          [Op.lte]: data.inputCheckinDate,
        },
        checkout_date: {
          [Op.gte]: data.inputCheckoutDate,
        },
        booking_status: "BOOKED",
      },
      group: ["hotel_id"],
    });
    let BookedHotelArray;
    if (bookedHotels) {
      BookedHotelArray = bookedHotels.map((instance) => instance.dataValues);
    }
    console.log(BookedHotelArray);
    console.log("**************************************");

    // find count of all rooms in all hotel with given location
    // use hotel_detail roomdetail
    const allhotelsByLocation = await models.hotelDetailModel.findAll({
      attributes: [
        "hotel_id",
        "hotel_name",
        "location",
        "address",
        "parking",
        "wifi",
        "room_service",
        "swimming_pool",
        "fitness_center",
        "dining",
        "owner_id",
        [
          Sequelize.literal(
            "(SELECT COUNT(DISTINCT room_id) FROM room_detail WHERE room_detail.hotel_id = hotel_detail.hotel_id)"
          ),
          "total_noof_rooms",
        ],
      ],
      include: [
        {
          model: models.roomDetailModel,
          attributes: [],
          required: false,
        },
      ],
      where: {
        location: data.inputLocation,
      },
      group: ["hotel_detail.hotel_id"],
    });

    let formattedAllHotelsByLocation = allhotelsByLocation.map((result) => {
      return result.dataValues;
    });

    // console.log(formattedAllHotelsByLocation);
    console.log("**************************************");

    // format result to include hoteldetail and noof unbooked rooms if its greater than user no of rooms
    const output = [];

    formattedAllHotelsByLocation.forEach((hotel) => {
      const hotelId = hotel.hotel_id;
      const totalNoOfRooms = hotel.total_noof_rooms;
      const bookedRoomsEntry = BookedHotelArray.find(
        (entry) => entry.hotel_id === hotelId
      );
      // console.log(bookedRoomsEntry);
      if (bookedRoomsEntry) {
        const totalBookedRooms = bookedRoomsEntry.total_noof_bookedrooms;
        const notBookedRooms = totalNoOfRooms - totalBookedRooms;
        console.log(notBookedRooms);
        if (notBookedRooms >= data.inputNoOfRooms) {
          output.push({ ...hotel, total_noof_rooms_notbooked: notBookedRooms });
        }
      }
    });
    console.log("*******************END*******************");
    return output;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// 1->home page
