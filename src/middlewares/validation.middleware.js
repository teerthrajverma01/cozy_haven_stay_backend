const { ValidationChain, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const adminValidator = () => [
  body("admin_name").trim().notEmpty().withMessage("name cannot be empty"),

  body("admin_email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email must contain @gmail.com"),

  body("admin_password")
    .trim()
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("password length should be greater than 5"),

  body("gender")
    .trim()
    .notEmpty()
    .custom((value) => {
      let gender_enum = ["MALE", "FEMALE", "OTHERS"];
      if (!gender_enum.includes(value)) {
        throw new Error("Gender not appropiate");
      }
      return true;
    }),

  body("admin_phoneno")
    .trim()
    .notEmpty()
    .withMessage("phoneno cannot be empty")
    .custom((value) => {
      const phoneRegex = /^(?:\+?\d{1,3}\s?)?(?:\d{10})$/;
      if (!phoneRegex.test(phoneNumber)) {
        throw new Error("invalid phoneno");
      }
      return true;
    }),
];

module.exports = adminValidator;
