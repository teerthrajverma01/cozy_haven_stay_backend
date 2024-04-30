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
    let {
      hotel_name,
      location,
      address,
      owner_id,
      parking,
      wifi,
      room_service,
      swimming_pool,
      fitness_center,
      dining,
    } = req.body;

    // adding hotel data to hotel_detail table
    let hotelData = { hotel_name, location, address, owner_id };
    let hotelInsertResult = await hotelService.addNewHotel(hotelData);
    if (hotelInsertResult == "FAILURE") {
      throw new ApiError(500, "Couldnot add new hotel in database ");
    }
    // adding hotel data to hotel_amenity_detail table
    let hotelAmenityData = {
      hotel_id: hotelInsertResult.hotel_id,
      parking,
      wifi,
      room_service,
      swimming_pool,
      fitness_center,
      dining,
    };
    let hotelAmenityInsertResult = await hotelService.addNewHotelAmenity(
      hotelAmenityData
    );
    if (hotelAmenityInsertResult == "FAILURE") {
      throw new ApiError(500, "Couldnot add new hotelamenity in database ");
    }

    let result = { ...hotelInsertResult, ...hotelAmenityInsertResult };
    return res
      .status(200)
      .json(new ApiResponse(200, result, "new hotel+amenity added "));
  } catch (error) {
    throw error;
  }
});

// update exsiting hotel_detail by id
module.exports.updateHotelDetail = AsyncHandler(async (req, res) => {
  try {
    let {
      hotel_name,
      location,
      address,
      owner_id,
      parking,
      wifi,
      room_service,
      swimming_pool,
      fitness_center,
      dining,
    } = req.body;

    // adding hotel data to hotel_detail table
    let hotelData = { hotel_name, location, address, owner_id };
    let hotelUpdateResult = await hotelService.updateHotelDetail(hotelData);
    if (hotelUpdateResult == "FAILURE") {
      throw new ApiError(500, "Couldnot add update hotel in database ");
    }
    // adding hotel data to hotel_amenity_detail table
    let hotelAmenityData = {
      hotel_id: hotelInsertResult.hotel_id,
      parking,
      wifi,
      room_service,
      swimming_pool,
      fitness_center,
      dining,
    };
    let hotelAmenityUpdateResult = await hotelService.updateHotelAmenityById(
      hotelAmenityData
    );
    if (hotelAmenityUpdateResult == "FAILURE") {
      throw new ApiError(500, "Couldnot update hotelamenity in database ");
    }

    let result = { ...hotelUpdateResult, ...hotelAmenityUpdateResult };
    return res
      .status(200)
      .json(new ApiResponse(200, result, "new hotel+amenity added "));
  } catch (error) {
    throw error;
  }
});

// get hotel by hotel_owner id
module.exports.getHotelDetailByOwnerId = AsyncHandler(async (id) => {
  try {
    let { ownerid } = req.params;
    let hotelData = await hotelOwnerService.getHotelDetailById(data);
    if (hotelData == "FAILURE") {
      throw new ApiError(500, "Couldnot fetch hotel detail from database ");
    }
    let hotel_id = hotelData.hotel_id;
    let hotelAmenityData = await hotelOwnerService.getHotelAmenityById(
      hotel_id
    );
    if (hotelAmenityData == "FAILURE") {
      throw new ApiError(
        500,
        "Couldnot fetch hotelamenity detail from database "
      );
    }
    let result = { ...hotelData, ...hotelAmenityData };
    return res
      .status(200)
      .json(new ApiResponse(200, result, "fetched hotel detail successfully "));
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
