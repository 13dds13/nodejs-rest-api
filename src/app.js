const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authCheck = require("./middlewares/authCheck");
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");
const { checkContactsReqBody } = require("./middlewares/checkReqBody");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", authCheck, checkContactsReqBody, contactsRouter);
app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
