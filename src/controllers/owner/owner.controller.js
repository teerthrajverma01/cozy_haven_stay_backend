const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  encryptPassword,
  isPasswordCorrect,
} = require("../../utils/bcryptMethods");
const generateToken = require("../../utils/generateToken");
const hotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");

// register new hotel owner
module.exports.ownerRegister = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;

    // check if owner already present or not
    // encrypt the password
    data.password = encryptPassword(data.password);
    // create entry in db
    let result = await hotelOwnerService.addNewHotelOwner(data);
    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot add new hotelowner to database ");
    }
    // remove password and refreshtoken  from response
    delete result[password];
    delete result[refresh_token];
    return res
      .status(200)
      .json(new ApiResponse(200, result, "new hotelowner registered"));
  } catch (error) {
    throw error;
  }
});

// login existing hotelowner
module.exports.ownerLogin = AsyncHandler(async (req, res) => {
  try {
    // req body -> data
    const data = req.body;
    //find the user
    const owner = await hotelOwnerService.getHotelOwnerByEmail(data.email);
    //password check
    const isPasswordValid = isPasswordCorrect(owner.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid owner credentials");
    }
    //set access and referesh token
    const { accessToken, refreshToken } =
      await generateToken.generateAccessAndRefereshTokens(
        "owner",
        owner.owner_id
      );

    //send cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };
    delete owner[password];
    return res
      .status(200)
      .cookie("userRole", "owner", options)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { ...owner, accessToken, refreshToken },
          "Owner logged In Successfully"
        )
      );
  } catch (error) {
    throw error;
  }
});

//  logout existing hotelowner
module.exports.ownerLogout = AsyncHandler(async (req, res) => {
  try {
    let { owner_id } = req.params;

    let data = await hotelOwnerService.getHotelOwnerById(owner_id);
    if (data == "FAILURE") {
      throw new ApiError(401, "owner_id invalid");
    }
    data.refresh_token = "";

    let updatedResult = await hotelOwnerService.updateHotelOwner(data);
    if (updatedResult == "FAILURE") {
      throw new ApiError(500, "cannot remove owner refreshtoken");
    }
    return res
      .status(200)
      .clearCookie("userRole", options)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "owner logged Out"));
  } catch (error) {
    throw error;
  }
});

// {
// "owner_name":"testowner1",
// "password":"testpassword1",
// "email":"testemail1",
// "gender":"MALE",
// "contact_no":"testcontactno1",
// "address":"testaddress1"
// }
