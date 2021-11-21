const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
} = require("../services/dbService/contactsDbService");

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
    const { body, params } = req;
    const updatedContact = await updateContactById(params.contactId, body);
    updatedContact ? res.json(updatedContact) : next();
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
};
