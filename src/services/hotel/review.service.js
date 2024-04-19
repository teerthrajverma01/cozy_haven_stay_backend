const db = require("../../config/dbconfig");
const models = require("../../models/index");

// create review with booking id
// user dashboard ->bookings  ->creates review for any booking
module.exports.addNewReview = async (data) => {
  try {
    // Create a new review record
    const newReview = await ReviewDetail.create({
      booking_id: data.booking_id,
      review: data.review,
      rating: data.rating,
    });
    if (newReview.dataValues) {
      return "SUCCESS";
    } else {
      throw new Error("Failed to add review");
    }
    return newReview;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

//list all review based on hotel
// home -> individual hotel page
module.exports.getAllReviewByHotelId = async (hotelId) => {
  try {
    const [reviews] = await models.ReviewDetailModel.findAll({
      include: [
        {
          model: models.BookingDetailModel,
          where: { hotel_id: hotelId },
        },
      ],
    });
    return reviews.dataValues;
  } catch (error) {
    throw new Error("Failed to get reviews: " + error.message);
  }
};

// list all reviews of user
// user dashboard -> reviews for all hotel
module.exports.getReviewByUserId = async () => {
  try {
    const [userReviews] = await models.ReviewDetailModel.findAll({
      include: [
        {
          model: models.BookingDetailModel,
          where: { user_id: userId },
        },
      ],
    });
    return userReviews.dataValues;
  } catch (error) {
    throw new Error("Failed to get user reviews: " + error.message);
  }
};
