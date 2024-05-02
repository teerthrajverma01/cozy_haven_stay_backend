const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const AsyncHandler = require("../../utils/asyncHandler");
const adminLogger = require("../../../logger/adminLogger/index");

const adminService = require("../../services/admin/admin_detail.service");
const userService = require("../../services/user/user_detail.service");
const ownerService = require("../../services/hotel/hotel_owner_detail.service");

// get admin by id
module.exports.getAdminById = AsyncHandler(async (req, res) => {
  try {
    // console.log("*******START********");
    let { admin_id: admin_authid } = req.auth;
    let { adminid } = req.params;
    console.log(adminid);
    let adminDetail = await adminService.getAdminById(adminid);
    if (adminDetail === "FAILURE") {
      adminLogger.error(
        `getAdminById -> $ADMIN_ID=[${admin_authid}] : Couldnot fetch admin detail`
      );
      throw new ApiError(500, "Couldnot fetch admin detail ");
    }
    delete adminDetail.refresh_token;
    delete adminDetail.admin_password;
    // console.log("*******END********");

    adminLogger.info(
      `getAdminById -> $ADMIN_ID=[${admin_authid}] : admin detail fetched successfully`
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, adminDetail, "admin detail fetched successfully")
      );
  } catch (error) {
    throw error;
  }
});

// get all user data
module.exports.getAllUser = AsyncHandler(async (req, res) => {
  try {
    // console.log("########START###############");
    let { admin_id: admin_authid } = req.auth;
    let userArray = await userService.getAllUser();

    if (userArray === "FAILURE") {
      adminLogger.error(
        `getAllUser -> $ADMIN_ID=[${admin_authid}] : Cannot get all users`
      );
      throw new ApiError(500, "Cannot get all users");
    }
    const outputRes = userArray.map(
      ({ password, refresh_token, ...rest }) => rest
    );

    adminLogger.info(
      `getAllUser -> $ADMIN_ID=[${admin_authid}] : all users fetched successfully`
    );
    // console.log("########END###############");
    return res
      .status(200)
      .json(new ApiResponse(200, outputRes, "all users fetched successfully"));
  } catch (error) {
    throw error;
  }
});

// delete user data by id
module.exports.deleteUserById = AsyncHandler(async (req, res) => {
  try {
    // console.log("########START###############");
    let { admin_id: admin_authid } = req.auth;

    let { userid } = req.params;
    let isDeletedUser = await userService.deleteUserById(userid);
    if (!isDeletedUser) {
      adminLogger.error(
        `deleteUserById -> $ADMIN_ID=[${admin_authid}] : No user with given id found`
      );
      throw new ApiError(400, "No user with given id found");
    }

    adminLogger.info(
      `deleteUserById -> $ADMIN_ID=[${admin_authid}] : User Deleted Successfully`
    );
    // console.log("########END###############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", "User Deleted Successfully"));
  } catch (error) {
    throw error;
  }
});
// *************************************************************
// get all hotelowner + hotel data
module.exports.getAllOwner = AsyncHandler(async (req, res) => {
  try {
    // console.log("########START###############");
    let { admin_id: admin_authid } = req.auth;
    let ownerArray = await ownerService.getAllHotelOwner();

    if (ownerArray === "FAILURE") {
      adminLogger.error(
        `getAllOwner -> $ADMIN_ID=[${admin_authid}] : Cannot get all owner`
      );
      throw new ApiError(500, "Cannot get all owner");
    }
    const outputRes = ownerArray.map(
      ({ password, refresh_token, ...rest }) => rest
    );

    adminLogger.info(
      `getAllOwner -> $ADMIN_ID=[${admin_authid}] : all owners fetched successfully`
    );
    // console.log("########END###############");
    return res
      .status(200)
      .json(new ApiResponse(200, outputRes, "all owners fetched successfully"));
  } catch (error) {
    throw error;
  }
});

// delete owner data by id
module.exports.deleteOwnerById = AsyncHandler(async (req, res) => {
  try {
    // console.log("########START###############");
    let { admin_id: admin_authid } = req.auth;
    let { ownerid } = req.params;
    let isDeletedOwner = await ownerService.deleteHotelOwnerById(ownerid);
    if (!isDeletedOwner) {
      adminLogger.error(
        `deleteOwnerById -> $ADMIN_ID=[${admin_authid}] : No owner with given id found`
      );
      throw new ApiError(400, "No owner with given id found");
    }

    adminLogger.info(
      `deleteOwnerById -> $ADMIN_ID=[${admin_authid}] : Owner Deleted Successfully`
    );
    // console.log("########END###############");

    return res
      .status(200)
      .json(new ApiResponse(200, "", "Owner Deleted Successfully"));
  } catch (error) {
    throw error;
  }
});
