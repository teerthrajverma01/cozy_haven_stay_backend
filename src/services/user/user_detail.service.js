const db = require("../../config/dbconfig");
const models = require("../../models/index");
// get all users
// 1->admin dashborad ->user section
module.exports.getAllUser = async () => {
  // let queryGetAllUser = "SELECT * FROM user_detail";
  // let [allUser] = await db.query(queryGetAllUser);
  try {
    const result = await models.userDetailModel.findAll();
    const dataValuesArray = result.map((instance) => instance.dataValues);
    return dataValuesArray;
  } catch (error) {
    console.log(error);
  }
};

// get user by id
// 1->user dashboard -> user profile
module.exports.getUserById = async (id) => {
  let queryGetUserById = `SELECT * FROM user_detail WHERE user_id = ?`;
  try {
    let [user_detail] = await db.query(queryGetAllUser, [id]);
    if (user_detail.length !== 1) {
      throw new Error("Could not fetch user_detail by user_id");
    }
    return user_detail;
  } catch (error) {
    console.log(error);
    return "FALIURE";
  }
};

// add new user
// 1->user signup
module.exports.addNewUser = async (data) => {
  // let queryAddUser = `INSERT INTO user_detail (user_name, password, email, gender, contact_no, address) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    // let [resultSetHeader] = await db.query(queryAddUser, [
    //   data.user_name,
    //   data.password,
    //   data.email,
    //   data.gender,
    //   data.contact_no,
    //   data.address,
    // ]);
    let result = await models.userDetailModel.create(data);
    return result.dataValues;

    // if (result) {
    // return "SUCCESS";
    // } else {
    // throw new Error("Error while inserting record in user_detail");
    // }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete user by id
// 1->admin dashboard -> admin wants to delete user
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

// update existing user by id
// 1-> user dashboard -> user wants to update user_detail
module.exports.updateUser = async (data) => {
  let queryUpdateUser = `UPDATE user_detail SET user_name = ?, password= ?, email= ?, gender= ?, contact_no= ?, address= ? WHERE user_id = ? `;

  try {
    let [resultSetHeader] = await db.query(queryUpdateUser, [
      data.user_name,
      data.password,
      data.email,
      data.gender,
      data.contact_no,
      data.address,
      data.user_id,
    ]);
    if (resultSetHeader.affectedRows == 1) {
      return "SUCCESS";
    } else {
      throw new Error("Error while updating record in user_detail");
    }
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
