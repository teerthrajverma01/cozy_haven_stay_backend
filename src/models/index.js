const userDetailModel = require("./user_detail.model");
const hotelOwnerDetailModel = require("./hotel_owner_detail.model");
const hotelDetailModel = require("./hotel_detail.model");

const models = {};
models.userDetailModel = userDetailModel;
models.hotelDetailModel = hotelDetailModel;
models.hotelOwnerDetailModel = hotelOwnerDetailModel;

module.exports = models;
