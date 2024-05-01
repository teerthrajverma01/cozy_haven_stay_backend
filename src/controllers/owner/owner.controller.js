const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  encryptPassword,
  isPasswordCorrect,
} = require("../../utils/bcryptMethods");
const { generateAccessAndRefreshTokens } = require("../../utils/generateToken");
const hotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");

// register new hotel owner
module.exports.ownerRegister = AsyncHandler(async (req, res) => {
  try {
    // console.log("##########START############################");
    let data = req.body;
    // check if owner already present or not
    // encrypt the password
    data.password = await encryptPassword(data.password);
    // create entry in db
    let result = await hotelOwnerService.addNewHotelOwner(data);
    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot add new hotelowner to database ");
    }
    // remove password and refreshtoken  from response
    delete result.password;
    delete result.refresh_token;
    // console.log("##########END############################");
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
    // console.log("##########START############################");
    let data = req.body;
    //find the user
    let owner = await hotelOwnerService.getHotelOwnerByEmail(data.email);
    if (owner === "FAILURE") {
      throw new ApiError(401, "Invalid owner email");
    }
    //password check
    const isPasswordValid = await isPasswordCorrect(
      data.password,
      owner.password
    );
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid owner credentials");
    }
    //set access and referesh token
    let tokens = await generateAccessAndRefreshTokens("owner", owner.owner_id);
    if (tokens === "FAILURE") {
      throw new ApiError(500, "Token error");
    }
    let accessToken = await tokens.accessToken;
    let refreshToken = await tokens.refreshToken;

    // update access token in admin_detail
    owner.refresh_token = refreshToken;
    const updateOwnerDetail = await hotelOwnerService.updateHotelOwner(owner);
    if (updateOwnerDetail === "FAILURE") {
      throw new ApiError(500, "Couldnot update owner refreshtoken ");
    }

    //send cookie
    const options = {
      httpOnly: true,
      secure: true,
    };
    delete owner.password;
    delete owner.refresh_token;
    // console.log("##########END############################");

    return res
      .status(200)
      .cookie("userRole", "owner", options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, owner, "Owner logged In Successfully"));
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
