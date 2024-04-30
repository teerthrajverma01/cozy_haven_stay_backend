const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const HotelDetail = db.define(
  "hotel_detail",
  {
    hotel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hotel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // hotelamenity
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    room_service: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    swimming_pool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fitness_center: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dining: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hotel_owner_detail",
        key: "owner_id",
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "hotel_detail",
    timestamps: false,
  }
);

// HotelDetail.belongsTo(models.hotelOwnerDetailModel);
// HotelDetail.hasMany(models.roomDetailModel);

module.exports = HotelDetail;
