const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");

const HotelOwnerDetail = db.define(
  "hotel_owner_detail",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
    },
    contact_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    tableName: "hotel_owner_detail",
    timestamps: false,
  }
);

module.exports = HotelOwnerDetail;
