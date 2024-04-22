const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");

// register new user
module.exports.userRegister = AsyncHandler(async (userData) => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// login existing user
module.exports.userLogin = AsyncHandler(async () => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});

// logout existing user
module.exports.userLogout = AsyncHandler(async () => {
  try {
  } catch (error) {
    throw new ApiError();
  }
});
