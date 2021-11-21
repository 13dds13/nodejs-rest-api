const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
} = require("../controllers/contacts");

router.get("/", listContacts);
router.get("/:contactId", getContact);
router.post("/", addContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
