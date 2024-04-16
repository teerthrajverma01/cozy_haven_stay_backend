const db = require("../config/dbconfig");

module.exports.getAllUser = async () => {
  let queryGetAllUser = "SELECT * FROM user_detail";
  let [allUser] = await db.query(queryGetAllUser);
  return allUser;
};

module.exports.getUserById = async (id) => {
  let queryGetUserById = `SELECT * FROM user_detail WHERE user_id = ?`;
  let [user] = await db.query(queryGetAllUser, [id]);
  return user;
};

module.exports.addNewUser = async (data) => {
  let queryAddUser = `INSERT INTO user_detail (user_name, password, email, gender, contact_no, address) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    let [resultSetHeader] = await db.query(queryAddUser, [
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
      throw new Error("Error while inserting record in user_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

module.exports.deleteUserById = async (id) => {
  let querydeleteUserById = `DELETE FROM user_detail WHERE user_id = ?`;
  try {
    let [resultSetHeader] = await db.query(querydeleteUserById, [id]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while deleting record from user_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
