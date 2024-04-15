const {
  hotel_owner_log,
  hotel_owner_error_log,
} = require("../../utils/logs/hotel_owner_log");

module.exports.hotelOwnerRegister = (hotelOwnerData) => {
  // validation
  try {
    let hotelOwnerName = hotelOwnerData.name;
    let hotelOwnerEmail = hotelOwnerData.email;
    let hotelOwnerPassword = hotelOwnerData.password;

    if (
      hotelOwnerName === "" ||
      hotelOwnerEmail === "" ||
      hotelOwnerPassword === ""
    ) {
      user_error_log("trying register-->name or email or password empty ");
      throw new Error("name or email or password empty ");
    } else {
      user_log("trying register-->validation success ");
    }

    //  database entry
    let databaseEntry = true;
    if ((databaseEntry = false)) {
      user_error_log("trying register-->database error");
      throw new Error("Datbase error");
    } else {
      user_log("trying register-->database entry success ");
    }

    user_log("registration complete", "SUCCESS");

    //response success
  } catch (error) {
    console.log(error);
  }
};
