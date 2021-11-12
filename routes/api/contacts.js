const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../model");
const { checkReqBody } = require("../../src/helpers/checkReqBody");
const {
  updateRouterOperation,
} = require("../../src/helpers/updateRouterOperation");
const { schemaGenegal, schemaPatch } = require("../../src/helpers/validation");

router.get("/", async (_, res) => {
  try {
    res.json(await listContacts());
  } catch (error) {
    console.log(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    data ? res.json(data) : next();
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const isBodyValid = checkReqBody(req, res, schemaGenegal);
    if (!isBodyValid) return;

    const id = uuidv4();
    const newContactData = { id, ...req.body };
    await addContact(newContactData);
    res.status(201).json(newContactData);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await removeContact(contactId);
    data ? res.json({ message: "contact deleted" }) : next();
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const isBodyValid = checkReqBody(req, res, schemaPatch);
    if (!isBodyValid) return;

    await updateRouterOperation(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const isBodyValid = checkReqBody(req, res, schemaGenegal);
    if (!isBodyValid) return;

    await updateRouterOperation(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
