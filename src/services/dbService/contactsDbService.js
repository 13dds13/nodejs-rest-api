const Contact = require("../../models/contacts");

const getAllContacts = async (page, limit) => {
  try {
    const contactsList = await Contact.find()
      .limit(limit)
      .skip(page * limit);
    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const getAllFavoriteContacts = async (page, limit) => {
  try {
    const contactsList = await Contact.find({ favorite: true })
      .limit(limit)
      .skip(page * limit);
    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (id) => {
  try {
    const data = await Contact.findById(id);
    return data || false;
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (data) => {
  try {
    const newContact = await Contact.create(data);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContactById = async (id) => {
  try {
    const data = await Contact.findByIdAndRemove(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateContactById = async (id, data) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  getAllFavoriteContacts,
};
