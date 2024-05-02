const ApiError = require("../../utils/ApiError");
const AsyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ownerLogger = require("../../../logger/ownerLogger/index");

const hotelOwnerService = require("../../services/hotel/hotel_owner_detail.service");
const hotelService = require("../../services/hotel/hotel.service");
const RoomService = require("../../services/hotel/room.service");

// update owner_detail
module.exports.updateOwnerDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;
    let result = await hotelOwnerService.updateHotelOwner(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `updateOwnerDetail -> $OWNER_ID=[${owner_authid}] : Couldnot update hotelowner in database `
      );
      throw new ApiError(500, "Couldnot update hotelowner in database ");
    }

    ownerLogger.info(
      `updateOwnerDetail -> $OWNER_ID=[${owner_authid}] : hotelowner updated`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", " hotelowner updated"));
  } catch (error) {
    throw error;
  }
});

// #########HOTEL############
// add new hotel_detail
module.exports.addNewHotelDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#####START########");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;

    // adding hotel data to hotel_detail table
    let hotelInsertResult = await hotelService.addNewHotel(data);
    if (hotelInsertResult == "FAILURE") {
      ownerLogger.error(
        `addNewHotelDetail -> $OWNER_ID=[${owner_authid}] : Couldnot add new hotel in database `
      );
      throw new ApiError(500, "Couldnot add new hotel in database ");
    }

    ownerLogger.info(
      `addNewHotelDetail -> $OWNER_ID=[${owner_authid}] : new hotel added`
    );
    // console.log("#####END########");

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
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;
    let hotelUpdateResult = await hotelService.updateHotelDetail(data);
    if (hotelUpdateResult === "FAILURE") {
      ownerLogger.error(
        `updateHotelDetail -> $OWNER_ID=[${owner_authid}] : Couldnot  update hotel in database`
      );
      throw new ApiError(500, "Couldnot  update hotel in database ");
    }
    ownerLogger.info(
      `updateHotelDetail -> $OWNER_ID=[${owner_authid}] :  hotel+amenity updated`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, "", " hotel+amenity updated"));
  } catch (error) {
    throw error;
  }
});

// get hotel by hotel_owner id
module.exports.getHotelDetailByOwnerId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let { ownerid } = req.params;
    let hotelData = await hotelService.getHotelDetailById(ownerid);
    if (hotelData == "FAILURE") {
      ownerLogger.error(
        `getHotelDetailByOwnerId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch hotel detail from database`
      );
      throw new ApiError(500, "Couldnot fetch hotel detail from database ");
    }

    ownerLogger.info(
      `getHotelDetailByOwnerId -> $OWNER_ID=[${owner_authid}] : fetched hotel detail successfully `
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(
        new ApiResponse(200, hotelData, "fetched hotel detail successfully ")
      );
  } catch (error) {
    throw error;
  }
});

// ######ROOM##############
// get all room by hotelid
module.exports.getAllRoomDetailByHotelId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;

    let { hotelid } = req.params;
    let result = await RoomService.getAllRoomsByHotelId(hotelid);
    if (result == "FAILURE") {
      ownerLogger.error(
        `getAllRoomDetailByHotelId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch all rooms from database`
      );
      throw new ApiError(500, "Couldnot fetch all rooms from database ");
    }

    ownerLogger.info(
      `getAllRoomDetailByHotelId -> $OWNER_ID=[${owner_authid}] : fetched all room by hotelownerid`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, result, " fetched all room by hotelownerid"));
  } catch (error) {
    throw error;
  }
});
// get room by roomid
module.exports.getRoomDetailByRoomId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let { roomid } = req.params;
    let result = await RoomService.getRoomById(roomid);
    if (result == "FAILURE") {
      ownerLogger.error(
        `getRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : Couldnot fetch given room from database`
      );
      throw new ApiError(500, "Couldnot fetch given room from database ");
    }
    ownerLogger.info(
      `getRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : fetched roomdetail by roomid`
    );
    // console.log("#########END############");
    return res
      .status(200)
      .json(new ApiResponse(200, result, "fetched roomdetail by roomid"));
  } catch (error) {
    throw error;
  }
});

// add new room
module.exports.addRoomDetail = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;
    let result = await RoomService.addNewRoom(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `addRoomDetail -> $OWNER_ID=[${owner_authid}] : Couldnot add given room in database`
      );
      throw new ApiError(500, "Couldnot add given room in database ");
    }

    ownerLogger.info(
      `addRoomDetail -> $OWNER_ID=[${owner_authid}] : added roomdetail successfully`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, result, "added roomdetail successfully "));
  } catch (error) {
    throw error;
  }
});

// delete room_detail by id
module.exports.deleteRoomDetailByRoomId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let { roomid } = req.params;
    let result = await RoomService.deleteExistingRoom(roomid);
    if (result === 0) {
      ownerLogger.error(
        `deleteRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : No room given id found`
      );
      throw new ApiError(500, "No room given id found ");
    }
    if (result == "FAILURE") {
      ownerLogger.error(
        `deleteRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : Couldnot delete room in  database`
      );
      throw new ApiError(500, "Couldnot delete room in  database ");
    }

    ownerLogger.info(
      `deleteRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] :deleted given room successfully`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, " deleted given room successfully"));
  } catch (error) {
    throw error;
  }
});
// update room by roomid
module.exports.updateRoomDetailByRoomId = AsyncHandler(async (req, res) => {
  try {
    // console.log("#########START############");
    let { owner_id: owner_authid } = req.auth;
    let data = req.body;
    let result = await RoomService.updateExistingRoom(data);
    if (result == "FAILURE") {
      ownerLogger.error(
        `updateRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : Couldnot update room in database`
      );
      throw new ApiError(500, "Couldnot update room in database ");
    }

    ownerLogger.info(
      `updateRoomDetailByRoomId -> $OWNER_ID=[${owner_authid}] : updated  room by roomid`
    );
    // console.log("#########END############");

    return res
      .status(200)
      .json(new ApiResponse(200, " updated  room by roomid"));
  } catch (error) {
    throw error;
  }
});
