const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { isPasswordCorrect } = require("../../utils/bcryptMethods");
const { generateAccessAndRefreshTokens } = require("../../utils/generateToken");

const adminService = require("../../services/admin/admin_detail.service");

// admin login
module.exports.adminLogin = AsyncHandler(async (req, res) => {
  try {
    // req body -> data
    const data = req.body;
    //find the user
    const admin = await adminService.getAdminByEmail(data.admin_email);
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
      expires: new Date(
        Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };
    delete admin.admin_password;
    delete admin.refresh_token;
    delete admin.access_token;

    return res
      .status(200)
      .cookie("userRole", "admin", options)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { ...admin, accessToken, refreshToken },
          "admin logged In Successfully"
        )
      );
  } catch (error) {
    throw error;
  }
});
// admin logout
module.exports.adminLogout = AsyncHandler(async (req, res) => {
  try {
    let { admin_id } = req.params;

    let data = await adminService.getAdminById(admin_id);
    if (data == "FAILURE") {
      throw new ApiError(401, "admin_id invalid");
    }
    data.refresh_token = "";

    let updatedResult = await adminService.updateAdminDetail(data);
    if (updatedResult == "FAILURE") {
      throw new ApiError(500, "cannot remove admin refreshtoken");
    }
    return res
      .status(200)
      .clearCookie("userRole", options)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
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
