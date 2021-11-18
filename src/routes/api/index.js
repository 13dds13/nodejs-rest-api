const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

router.get("/", listContacts);
router.get("/:contactId", getContact);
router.post("/", addContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
