require("dotenv").config();
const jwt = require("jsonwebtoken");
const request = require("supertest");

const app = require("../src/app");

test("endpoint test with auth error", (done) => {
  request(app).patch("/api/users/avatars").expect(401).end(done);
});

// test("endpoint test with valid data", () => {
//   const secretKey = process.env.SECRET;
//   const token = jwt.sign({ payload: { id: "12345" } }, secretKey);
//   request(app)
//     .patch("/api/users/avatars")
//     .set("Authorization", "Bearer " + token)
//     .attach("avatar", "../public/avatars/test_image.jpg")
//     .expect(200)
//     .expect({ message: "Successfully uploaded" })
//     .end();
// });
