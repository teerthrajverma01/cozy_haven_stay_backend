const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userRole = req.cookies?.userRole;
    let result;
    if (userRole == "admin") {
      result = await hotelOwnerService.getHotelOwnerById(
        decodedToken?.admin_id
      );
    } else if (userRole == "owner") {
      result = await adminService.getAdminById(decodedToken?.owner_id);
    } else if (userRole == "user") {
      result = await userService.getUserById(decodedToken?.user_id);
    }
    if (!result) {
      throw new ApiError(401, "Invalid Access Token");
    }
    delete result[password];
    delete result[refreshToken];

    req.body = { ...result };
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
