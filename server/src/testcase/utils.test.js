const request = require("supertest");


const app = require("../index").app

describe("Create user", () => {
  it("should create a user", (done) => {

    const values = {
      "name": "test",
      "email": "test@gmail.com",
      "password": "1231231231",
      "phoneNumber": 9638774505
    }
    let url = "http://localhost:3000/users"

    request(app)
      .post('/users')
      .send(values)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((e) => {
        if(e.body.error) {
          throw new Error(e.body.error);
        }
      })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
})



describe("login user", () => {
  it("should login a user", (done) => {

    const values = {
      "email": "test@gmail.com",
      "password": "1231231231",
    }
    request(app)
      .post('/users/login')
      .send(values)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
})



describe("get user by ID", () => {
  it("should get a user by id", (done) => {

    var commonHeaders = { "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmEyOWRmZGE3NGU0MTE4NjQwZWU2ZTMiLCJpYXQiOjE2MDQ0OTI3OTd9.S4u1lnkKBPpcxSTLsC2qZ3ovcMwrRhaCteWBf2hnyzc" };

    const values = {
      "id": "5fa29dfda74e4118640ee6e3"
    }

    request(app)
      .post('/users/id')
      .send(values)
      .set(commonHeaders)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
})
