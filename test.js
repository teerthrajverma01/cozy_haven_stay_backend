const { user_log, user_error_log } = require("./app/utils/logs/user_log");
const {
  hotel_owner_log,
  hotel_owner_error_log,
} = require("./app/utils/logs/hotel_owner_log");

//user
// register
user_log("new user added to database");
user_log("new user mail verified");
user_error_log("trying register-->image upload error ");
user_log("user successfully registered ", "SUCCESS");
// login
user_log("trying login-->user credentials valid");
user_log("user logged in successfully ", "SUCCESS");
user_error_log("trying login-->user credentials invalid");
// logout
user_log("trying logout-->user credentials valid");
user_log("user logged out successfully ", "SUCCESS");
user_error_log("trying logout-->user credentials invalid");

//hotelowner
// register
hotel_owner_log("hotelowner added to database");
hotel_owner_log("hotelowner mail verified");
hotel_owner_error_log("trying register-->image upload error ");
hotel_owner_log("hotelowner successfully registered ", "SUCCESS");
// login
hotel_owner_log("trying login-->hotelowner credentials valid");
hotel_owner_log("hotelowner logged in successfully ", "SUCCESS");
hotel_owner_error_log("trying login-->hotelowner credentials invalid");
// logout
hotel_owner_log("trying logout-->hotelowner credentials valid");
hotel_owner_log("hotelowner logged out successfully ", "SUCCESS");
hotel_owner_error_log("trying logout-->hotelowner credentials invalid");
