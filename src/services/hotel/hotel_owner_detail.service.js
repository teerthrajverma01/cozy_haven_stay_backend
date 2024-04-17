const db = require("../../config/dbconfig");

// get all hotelowner
// 1->admin dashborad ->hotel/owners subsection
module.exports.getAllHotelOwner = async () => {
  let queryGetAllHotelOwner = "SELECT * FROM hotel_owner_detail";
  let [allHotelOwner] = await db.query(queryGetAllHotelOwner);

  return allHotelOwner;
};

// get hotelowner by id
// 1-> hotelowner dashboard -> owner profile
module.exports.getHotelOwnerById = async (id) => {
  let queryGetHotelOwnerById = `SELECT * FROM hotel_owner_detail WHERE owner_id = ?`;
  let [hotelOwner] = await db.query(queryGetHotelOwnerById, [id]);
  return hotelOwner;
};

// add new hotelowner
// 1-> hotelowner signup
module.exports.addNewHotelOwner = async (data) => {
  let queryAddHotelOwner = `INSERT INTO hotel_owner_detail (owner_name, password, email, gender, contact_no, address) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    let [resultSetHeader] = await db.query(queryAddHotelOwner, [
      data.owner_name,
      data.password,
      data.email,
      data.gender,
      data.contact_no,
      data.address,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while inserting record in hotel_owner_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete hotelowner by id
// 1-> admin dashboard -> admin want to delete hotelowner
module.exports.deleteHotelOwnerById = async (id) => {
  let querydeleteHotelOwnerById = `DELETE FROM hotel_owner_detail WHERE owner_id = ?`;
  try {
    let [resultSetHeader] = await db.query(querydeleteHotelOwnerById, [id]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while deleting record from hotel_owner_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update hotel owner
// 1-> hotelowner dashboard -> owner wants to update owner_detail
module.exports.updateHotelOwner = async (data) => {
  let queryUpdateHotelOwner = `UPDATE hotel_owner_detail SET owner_name = ?, password= ?, email= ?, gender= ?, contact_no= ?, address= ? WHERE owner_id = ?`;

  try {
    let [resultSetHeader] = await db.query(queryUpdateHotelOwner, [
      data.owner_name,
      data.password,
      data.email,
      data.gender,
      data.contact_no,
      data.address,
      data.owner_id,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while updating record in hotel_owner_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
