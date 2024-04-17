const db = require("../../config/dbconfig");

// add new hotel_detail
// 1-> hotelownerdashboard addnew hotel (ifnotexist)->hotelowner adds new hotel
module.exports.addNewHotel = async (data) => {
  let queryAddNewHotel = `INSERT INTO hotel_detail (hotel_name,location,address,owner_id) VALUES (?,?,?,?)`;
  try {
    // insert into hotel_detail
    let [resultSetHeader] = await db.query(queryAddNewHotel, [
      data.hotel_name,
      data.location,
      data.address,
      data.owner_id,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while inserting record in hotel_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
module.exports.addNewHotelAmenity = async (data) => {
  let queryAddHotelAmenity = `INSERT INTO hotel_amenity (hotel_id, parking, wifi, room_service, swimming_pool, fitness_enter, dining) VALUES (?,?,?,?,?,?,?)`;
  try {
    // insert into hotel_amenity
    let [resultSetHeader] = await db.query(queryAddHotelAmenity, [
      data.hotel_id,
      data.parking,
      data.wifi,
      data.room_service,
      data.swimming_pool,
      data.room_service,
      data.fitness_enter,
      data.dining,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while inserting record in hotel_amenity");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update exsiting hotel_detail by id
// 1-> hotelownerdashboard update hotel detail (ifexist)->hotelowner updates existing hotel
module.exports.updateHotelDetail = async (data) => {
  let queryUpdateHotelDetail = `UPDATE hotel_detail SET hotel_name=?, location=?, address=? WHERE hotel_id=?`;
  try {
    let [resultSetHeader] = await db.query(queryUpdateHotelDetail, [
      data.hotel_name,
      data.location,
      data.address,
      data.hotel_id,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while updating record in hotel_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
module.exports.updateHotelAmenityById = async (data) => {
  try {
    let queryUpdateHotelAmenity = `UPDATE hotel_amenity SET parking=?, wifi=?, room_service=?, swimming_pool=?, fitness_enter=?, dining=? WHERE hotel_id =?`;
    let [resultSetHeader] = await db.query(queryUpdateHotelAmenity, [
      data.parking,
      data.wifi,
      data.room_service,
      data.swimming_pool,
      data.fitness_enter,
      data.dining,
      data.hotel_id,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while updating record in hotel_amenity");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get hotel by hotel_owner id
// 1-> hotelowner dashboard hotel detail-> display hotel detail
module.exports.getHotelDetailById = async (id) => {
  let queryGetHotelDetailByid = `SELECT * FROM hotel_detail WHERE owner_id = ?`;
  try {
    let [hotel_detail] = await db.query(queryUpdateHotelDetailById, [id]);
    if (hotel_detail.length !== 1) {
      throw new Error("Could not fetch hotel_detail by hotel_owner_id");
    }
    return hotel_detail;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
module.exports.getHotelAmenityById = async (id) => {
  let queryGetHotelAmenityByid = `SELECT * FROM hotel_amenity WHERE hotel_id = ?`;
  try {
    let [hotel_amenity] = await db.query(queryGetHotelAmenityByid, [id]);
    if (hotel_amenity.length !== 1) {
      throw new Error("Could not fetch hotel_amenity by hotel_id");
    }
    return hotel_amenity;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// ******************************************************
// delete hotel by id
// 1->admin dashboard -> admin deletes hotel by id

// get all hotel by hotel_owner
// 1-> admindashborard -> display all hotels

// get all hotel by hotel location

// get all hotel by (hotelloc+noofrooms+checkindate+checkoutdate)
// 1->home page
