const server = require("../../index");

let chai = require("chai");
let chaiHttp = require("chai-http");

// assertion style shoot
chai.should();
chai.use(chaiHttp);

describe("OwnerApi", () => {
  // register new hotel owner
  let data = {
    owner_name: "testowner1",
    password: "testpassword1",
    email: "testemail1",
    gender: "MALE",
    contact_no: "testcontactno1",
    address: "testaddress1",
  };
  describe("POST /api/owner/register", () => {
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
  // add new hotel_detail
  // update exsiting hotel_detail by id
  // get hotel by hotel_owner id
  // get all room by hotelowner id
  // delete room_detail by id
  // update room by roomid
});
