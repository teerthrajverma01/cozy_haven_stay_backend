import jwt from "jsonwebtoken";
const hotelOwnerService = require("../services/hotel/hotel_owner_detail.service");
const userService = require("../services/user/user_detail.service");
const adminService = require("../services/admin/admin_detail.service");

const generateAccessToken = (data) => {
  return jwt.sign(
    {
      owner_id: data.owner_id,
      email: data.email,
      owner_name: data.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = () => {
  return jwt.sign(
    {
      owner_id: data.owner_id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

module.exports.generateAccessAndRefereshTokens = async (userRole, id) => {
  try {
    let result;
    if (userRole == "admin") {
      result = await hotelOwnerService.getHotelOwnerById(id);
    } else if (userRole == "owner") {
      result = await adminService.getAdminById(id);
    } else if (userRole == "user") {
      result = await userService.getUserById(id);
    }

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);

    result.refreshToken = refreshToken;
    let updatedResult;
    if (userRole == "admin") {
      updatedResult = await hotelOwnerService.updateHotelOwner(result);
    } else if (userRole == "owner") {
      updatedResult = await adminService.updateAdminDetail(result);
    } else if (userRole == "user") {
      updatedResult = await userService.updateUser(result);
    }

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
