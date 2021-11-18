const Contact = require("../../models");

const getAllContacts = async () => await Contact.find();

const getContactById = async (id) => await Contact.findById(id);

const createContact = async (data) => await Contact.create(data);

const removeContactById = async (id) => await Contact.findByIdAndRemove(id);

const updateContactById = async (id, data) =>
  await Contact.findByIdAndUpdate(id, data, { new: true });

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
};
