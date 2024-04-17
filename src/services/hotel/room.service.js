const db = require("../../config/dbconfig");

// add new room_detail
// 1-> hotelownerdashboard addnew room ->hotelowner adds new room
module.exports.addNewRoom = async (data) => {
  let queryAddNewRoom = `INSERT INTO room_detail (room_size,max_people_accomodate, base_fare,ac_non_ac, hotel_id) VALUES (?,?,?,?,?)`;
  try {
    // insert into hotel_detail
    let [resultSetHeader] = await db.query(queryAddNewRoom, [
      data.room_size,
      data.max_people_accomodate,
      data.base_fare,
      data.ac_non_ac,
      data.hotel_id,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while inserting record in room_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update exiting room_detail by id
// 1->hotelownerdashboard update room->  hotelowner updates room by id
module.exports.updateExistingRoom = async (data) => {
  let queryUpdateRoomDetailById = `UPDATE room_detail SET room_size=?, max_people_accomodate=?, base_fare=?, ac_non_ac=? WHERE room_id=?`;
  try {
    let [resultSetHeader] = await db.query(queryUpdateRoomDetailById, [
      data.room_size,
      data.max_people_accomodate,
      data.base_fare,
      data.ac_non_ac,
      data.room_id,
    ]);
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete room_detail by id
// 1->hotelownerdashboard delete room-> hotelowner deletes existing room by id
module.exports.deleteExistingRoom = async (id) => {
  let queryDeleteExistingRoom = `DELETE FROM room_detail WHERE room_id = ?`;
  try {
    let [resultSetHeader] = await db.query(queryDeleteExistingRoom, [id]);
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

// *********************************************************

// get all rooms by hotelid, checkindate and checkoutdate   -> when someone clicks inside a hotel
