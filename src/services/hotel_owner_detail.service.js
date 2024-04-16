const db = require("../config/dbconfig");

module.exports.getAllHotelOwner = async () => {
  let queryGetAllHotelOwner = "SELECT * FROM hotel_owner_detail";
  let [allHotelOwner] = await db.query(queryGetAllHotelOwner);

  return allHotelOwner;
};

module.exports.getHotelOwnerById = async (id) => {
  let queryGetUserById = `SELECT * FROM hotel_owner_detail WHERE owner_id = ?`;
  let [hotelOwner] = await db.query(queryGetUserById, [id]);
  return hotelOwner;
};

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
