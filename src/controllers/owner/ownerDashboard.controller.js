const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const hotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");
const hotelService = require("../../services/hotel/hotel.service");
const RoomService = require("../../services/hotel/room.service");

// update owner_detail
module.exports.updateOwnerDetail = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;
    let result = await hotelOwnerService.updateHotelOwner(data);
    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot update hotelowner in database ");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "", " hotelowner updated"));
  } catch (error) {
    throw error;
  }
});

// add new hotel_detail
module.exports.addNewHotelDetail = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;

    // adding hotel data to hotel_detail table
    let hotelInsertResult = await hotelService.addNewHotel(data);
    if (hotelInsertResult == "FAILURE") {
      throw new ApiError(500, "Couldnot add new hotel in database ");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, hotelInsertResult, "new hotel added "));
  } catch (error) {
    throw error;
  }
});

// update exsiting hotel_detail by id
module.exports.updateHotelDetail = AsyncHandler(async (req, res) => {
  try {
    let data = req.body;

    // adding hotel data to hotel_detail table

    let hotelUpdateResult = await hotelService.updateHotelDetail(data);
    if (hotelUpdateResult == "FAILURE") {
      throw new ApiError(500, "Couldnot add update hotel in database ");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, hotelUpdateResult, "new hotel+amenity added ")
      );
  } catch (error) {
    throw error;
  }
});

// get hotel by hotel_owner id
module.exports.getHotelDetailByOwnerId = AsyncHandler(async (id) => {
  try {
    let { ownerid } = req.params;
    let hotelData = await hotelOwnerService.getHotelDetailById(ownerid);
    if (hotelData == "FAILURE") {
      throw new ApiError(500, "Couldnot fetch hotel detail from database ");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, hotelData, "fetched hotel detail successfully ")
      );
  } catch (error) {
    throw error;
  }
});

// get all room by hotelowner id
module.exports.getAllRoomDetailByOwnerId = AsyncHandler(async (id) => {
  try {
    let { ownerid } = req.params;
    let result = await RoomService.getAllRoomsByHotelOwnerId(ownerid);
    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot update hotelowner in database ");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, result, " fetched all room by hotelownerid"));
  } catch (error) {
    throw error;
  }
});

// delete room_detail by id
module.exports.deleteRoomDetailByRoomId = AsyncHandler(async (id) => {
  try {
    let { roomid } = req.params;
    let result = await RoomService.deleteExistingRoom(ownerid);
    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot update hotelowner in database ");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, " fetched all room by hotelownerid"));
  } catch (error) {
    throw error;
  }
});
// update room by roomid
module.exports.updateRoomDetailByRoomId = AsyncHandler(async (id) => {
  try {
    let data = req.params;
    let result = await RoomService.updateExistingRoom(data);
    if (result == "FAILURE") {
      throw new ApiError(500, "Couldnot update room in database ");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, " updated  room by roomid"));
  } catch (error) {
    throw error;
  }
});
