const server = require("../../index");

let chai = require("chai");
let chaiHttp = require("chai-http");

// assertion style shoot
chai.should();
chai.use(chaiHttp);

describe("OwnerApi", () => {
  // register new hotel owner
  describe("POST /api/owner/register", () => {
    let data = {
      owner_name: "testowner1",
      password: "testpassword1",
      email: "testemail1",
      gender: "MALE",
      contact_no: "testcontactno1",
      address: "testaddress1",
    };
    it("it should add new hotelowner", (done) => {
      chai
        .request(server)
        .post("/api/owner/register")
        .send(data)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // update owner_detail
  describe("POST /api/owner/dashboard/update-owner", () => {
    it("it should update hotelowner", (done) => {
      chai
        .request(server)
        .put("/api/owner/dashboard/update-owner")
        .send(data)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // add new hotel_detail
  describe("POST /api/owner/dashboard/add-new-hotel", () => {
    const data = {
      hotel_name: "testhotel1",
      location: "testlocation1",
      address: "testaddress1",
      owner_id: 1, //it should exist
      //amenity
      parking: true,
      wifi: true,
      room_service: true,
      swimming_pool: false,
      fitness_center: false,
      dining: true,
    };
    it("it should add new hotel", (done) => {
      chai
        .request(server)
        .post("/api/owner/dashboard/add-new-hotel")
        .send(data)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // update exsiting hotel_detail by id
  describe("POST /api/owner/dashboard/update-hotel", () => {
    const data = {
      hotel_name: "updatedtesthotel1",
      location: "updatedtestlocation1",
      address: "updatedtestaddress1",
      owner_id: 1, //it should exist
      //amenity
      parking: true,
      wifi: false,
      room_service: false,
      swimming_pool: false,
      fitness_center: false,
      dining: false,
    };
    it("it should update existing hotel", (done) => {
      chai
        .request(server)
        .put("/api/owner/dashboard/update-hotel")
        .send(data)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // get hotel by hotel_owner id
  describe("POST /api/owner/dashboard/get-hotel/:ownerid", () => {
    it("it should get existing hotel", (done) => {
      chai
        .request(server)
        .put("/api/owner/dashboard//get-hotel/:ownerid")
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // get all room by hotelowner id
  describe("POST /api/owner/dashboard/get-rooms/:ownerid", () => {
    it("it should get all rooms", (done) => {
      chai
        .request(server)
        .get("/api/owner/dashboard/get-rooms/:ownerid")
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // delete room_detail by id
  describe("POST /api/owner/dashboard/delete-room/:roomid", () => {
    it("it should deleted room", (done) => {
      chai
        .request(server)
        .delete("/api/owner/dashboard/delete-room/:ownerid")
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // update room by roomid
  describe("POST /api/owner/dashboard/delete-room/:roomid", () => {
    it("it should update room", (done) => {
      let roomdetail = {
        room_id: 1, //assuming 1
        room_size: 233,
        bed_size: 233,
        max_people_accomodate: 2,
        base_fare: 255,
        ac_non_ac: false,
        hotel_id: 1, //assuming 1
      };
      chai
        .request(server)
        .put("/api/owner/dashboard/update-room/:ownerid")
        .send(roomdetail)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });
  });
  // owner login [REMAINING]
  // owner logout [REMAINING]
});
