const db = require("../../config/dbconfig");
const models = require("../../models/index");
// get all users
// 1->admin dashborad ->user section
module.exports.getAllUser = async () => {
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
  // let queryGetUserById = `SELECT * FROM user_detail WHERE user_id = ?`;
  try {
    // let [user_detail] = await db.query(queryGetAllUser, [id]);
    const user_detail = await models.userDetailModel.findOne({
      where: { user_id: id },
    });
    if (!user_detail) {
      throw new Error("Could not fetch user_detail by user_id");
    }
    return user_detail.dataValues;
  } catch (error) {
    console.log(error);
    return "FALIURE";
  }
};

// add new user
// 1->user signup
module.exports.addNewUser = async (data) => {
  try {
    let result = await models.userDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete user by id
// 1->admin dashboard -> admin wants to delete user
module.exports.deleteUserById = async (id) => {
  try {
    const result = models.userDetailModel.destroy({ where: { user_id: id } });
    return result; // noofitems OR 0
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update existing user by id
// 1-> user dashboard -> user wants to update user_detail
module.exports.updateUser = async (data) => {
  try {
    const result = await models.userDetailModel.update(
      {
        user_name: data.user_name,
        password: data.password,
        gender: data.gender,
        contact_no: data.contact_no,
        address: data.address,
      },
      {
        where: {
          user_id: data.user_id,
        },
      }
    );
    return result; //[index]
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
