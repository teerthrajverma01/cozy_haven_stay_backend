const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const models = require("./index");

const RoomDetail = db.define(
  "room_detail",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_size: {
      type: DataTypes.INTEGER,
    },
    bed_size: {
      type: DataTypes.ENUM("SINGLE_BED", "DOUBLE_BED", "KINGSIZE_BED"),
    },
    max_people_accomodate: {
      type: DataTypes.INTEGER,
    },
    base_fare: {
      type: DataTypes.INTEGER,
    },
    ac_non_ac: {
      type: DataTypes.BOOLEAN,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hotel_detail",
        key: "hotel_id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "room_detail",
  }
);

// RoomDetail.belongsTo(models.hotelDetailModel, { foreignKey: "hotel_id" });

module.exports = RoomDetail;

// DROP TABLE IF EXISTS room_detail;
// CREATE TABLE IF NOT EXISTS room_detail (
// 	room_id INT PRIMARY KEY AUTO_INCREMENT,
//     room_size INT ,
//     bed_size ENUM ('SINGLE_BED', 'DOUBLE_BED', 'KINGSIZE_BED'),
//     max_people_accomodate INT,
//     base_fare INT,
//     ac_non_ac BOOL,
//     hotel_id INT NOT NULL ,
