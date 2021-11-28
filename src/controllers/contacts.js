const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  getAllFavoriteContacts,
} = require("../services/dbService/contactsDbService");

const listContacts = async (req, res) => {
  try {
    const {
      query: { page = 0, limit = 5, favorite },
      user,
    } = req;
    if (favorite) {
      const favoriteContacts = await getAllFavoriteContacts(
        +page,
        +limit,
        user._id
      );
      res.json(favoriteContacts);
      return;
    }
    const allContacts = await getAllContacts(+page, +limit, user._id);
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
    const { body, user } = req;
    const newContact = await createContact({ ...body, owner: user.id });
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
