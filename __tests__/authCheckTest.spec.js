require("dotenv").config();
const jwt = require("jsonwebtoken");
const authCheck = require("../src/middlewares/authCheck");
const User = require("../src/models/users");

test("authCheck middleware testing with valid data", async () => {
  const secretKey = process.env.SECRET;
  const id = "123";
  const token = jwt.sign({ payload: { id } }, secretKey);

  const mReq = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const mRes = {};
  const mockNext = jest.fn();
  const user = {
    id,
    token,
  };

  jest.spyOn(User, "findById").mockImplementationOnce(() => user);

  await authCheck(mReq, mRes, mockNext);

  expect(mReq.user.id).toEqual(id);
  expect(mReq.user.token).toEqual(token);
  expect(mockNext).toHaveBeenCalled();
});

test("authCheck middleware testing with invalid data", async () => {
  const mReq = {};
  const mRes = {};
  const mockNext = jest.fn();

  await authCheck(mReq, mRes, mockNext);

  expect(mockNext).toHaveBeenCalledTimes(0);
});
