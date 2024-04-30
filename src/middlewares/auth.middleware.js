const jwt = require("jsonwebtoken");
require("dotenv").config();
const ApiError = require("../utils/ApiError");

module.exports.verifyJWT = async (req, _, next) => {
  try {
    console.log("############################");
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    console.log("############################");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    console.log("############################");
    const userRole = req.cookies?.userRole;
    let result;
    if (userRole == "admin") {
      result = await adminService.getAdminById(decodedToken?.admin_id);
    } else if (userRole == "owner") {
      result = await hotelOwnerService.getHotelOwnerById(
        decodedToken?.owner_id
      );
    } else if (userRole == "user") {
      result = await userService.getUserById(decodedToken?.user_id);
    }

    if (!result) {
      throw new ApiError(401, "Invalid Access Token");
    }
    console.log("############################");
    if (userRole == "admin") {
      delete result.admin_password;
      delete result.admin_refresh_token;
    } else {
      delete result.password;
      delete result.refresh_token;
    }

    req.body = { ...result };
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
