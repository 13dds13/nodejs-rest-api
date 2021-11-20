const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
} = require("../services/contacts");
const { checkReqBody } = require("../services/helpers/checkReqBody");
const {
  schemaPatchFavorite,
  schemaPut,
  schemaPost,
} = require("../services/helpers/validation");

const listContacts = async (_, res) => {
  try {
    const allContacts = await getAllContacts();
    res.json(allContacts);
  } catch (error) {
    console.log(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    contact ? res.json(contact) : next();
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req, res) => {
  try {
    const isBodyValid = checkReqBody(req, res, schemaPost);
    if (!isBodyValid) return;
    const { body } = req;
    const newContact = await createContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContactById(req.params.contactId);
    contact ? res.json(contact) : next();
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const isBodyValid = checkReqBody(req, res, schemaPut);
    if (!isBodyValid) return;
    const { body, params } = req;
    const updatedContact = await updateContactById(params.contactId, body);
    updatedContact ? res.json(updatedContact) : next();
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const isBodyValid = checkReqBody(req, res, schemaPatchFavorite);
    if (!isBodyValid) return;
    const { body, params } = req;
    const updatedStatus = await updateContactById(params.contactId, body);
    updatedStatus ? res.json(updatedStatus) : next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
