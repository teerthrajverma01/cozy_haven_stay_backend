const userDetailModel = require("./user_detail.model");
const hotelOwnerDetailModel = require("./hotel_owner_detail.model");
const hotelDetailModel = require("./hotel_detail.model");
const hotelAmenityModel = require("./hotel_amenity.model");
const roomDetailModel = require("./room_detail.model");
const adminModel = require("./admin.model");

const models = {};
models.userDetailModel = userDetailModel;
models.hotelDetailModel = hotelDetailModel;
models.hotelOwnerDetailModel = hotelOwnerDetailModel;
models.hotelAmenityModel = hotelAmenityModel;
models.roomDetailModel = roomDetailModel;
models.adminModel = adminModel;

module.exports = models;
