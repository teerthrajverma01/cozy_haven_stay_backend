const { user_log, user_error_log } = require("../../utils/logs/user_log");

module.exports.userRegister = (userData) => {
  // validation
  try {
    let userName = userData.name;
    let userEmail = userData.email;
    let userPassword = userData.password;

    if (userName === "" || userEmail === "" || userPassword === "") {
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
