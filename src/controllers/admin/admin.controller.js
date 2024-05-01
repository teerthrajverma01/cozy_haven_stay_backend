const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { isPasswordCorrect } = require("../../utils/bcryptMethods");
const { generateAccessAndRefreshTokens } = require("../../utils/generateToken");
require("dotenv").config();

const adminService = require("../../services/admin/admin_detail.service");

// admin login
module.exports.adminLogin = AsyncHandler(async (req, res) => {
  try {
    // console.log("*******START********");
    let data = req.body;
    //find the user
    let admin = await adminService.getAdminByEmail(data.admin_email);
    if (admin === "FAILURE") {
      throw new ApiError(401, "Invalid admin email");
    }
    //password check
    const isPasswordValid = await isPasswordCorrect(
      data.admin_password,
      admin.admin_password
    );
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid admin credentials");
    }

    //set access and referesh token
    let tokens = await generateAccessAndRefreshTokens("admin", admin.admin_id);
    if (tokens === "FAILURE") {
      throw new ApiError(500, "Token error");
    }
    let accessToken = await tokens.accessToken;
    let refreshToken = await tokens.refreshToken;

    // update access token in admin_detail
    admin.refresh_token = refreshToken;
    const updateAdminDetail = await adminService.updateAdminDetail(admin);
    if (updateAdminDetail === "FAILURE") {
      throw new ApiError(500, "Couldnot update admin refreshtoken ");
    }

    //send cookie
    const options = {
      httpOnly: true,
      secure: true,
    };
    delete admin.admin_password;
    delete admin.refresh_token;
    // console.log("*******END********");
    return res
      .status(200)
      .cookie("userRole", "admin", options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, admin, "admin logged In Successfully"));
  } catch (error) {
    throw error;
  }
});
// admin logout
module.exports.adminLogout = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START#########");
    let { adminid } = req.params;

    let data = await adminService.getAdminById(adminid);
    if (data === "FAILURE") {
      throw new ApiError(401, "admin_id invalid");
    }

    data.refresh_token = "";
    let updatedResult = await adminService.updateAdminDetail(data);
    if (updatedResult === "FAILURE") {
      throw new ApiError(500, "cannot remove admin refreshtoken");
    }
    // console.log("###########END#################");

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("userRole", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "admin logged Out"));
  } catch (error) {
    throw error;
  }
});
// {
// "admin_name":"testadmin1",
// "admin_password":"testadminpassword1",
// "admin_email":"testadminemail1",
// "gender":"MALE",
// "admin_phoneno":"testadminphoneno1",
// }
