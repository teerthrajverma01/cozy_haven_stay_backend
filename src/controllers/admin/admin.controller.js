const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { isPasswordCorrect } = require("../../utils/bcryptMethods");
const generateToken = require("../../utils/generateToken");

const adminService = require("../../services/admin/admin_detail.service");

// admin login
module.exports.adminLogin = AsyncHandler(async (req, res) => {
  try {
    // req body -> data
    const data = req.body;
    //find the user
    const admin = await adminService.getAdminByEmail(data.admin_email);
    //password check
    const isPasswordValid = isPasswordCorrect(admin.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid admin credentials");
    }
    //set access and referesh token
    const { accessToken, refreshToken } =
      await generateToken.generateAccessAndRefereshTokens(
        "admin",
        admin.admin_id
      );

    //send cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };
    delete admin[admin_password];
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
    throw new ApiError();
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
    throw new ApiError();
  }
});
// {
// "admin_name":"testadmin1",
// "admin_password":"testadminpassword1",
// "admin_email":"testadminemail1",
// "gender":"MALE",
// "admin_phoneno":"testadminphoneno1",
// }
