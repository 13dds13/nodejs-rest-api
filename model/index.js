const fs = require("fs/promises");
const path = require("path");

const contactsListPath = path.join(__dirname, "./contacts.json");

const writeNewContactsList = async (data) => {
  try {
    await fs.writeFile(contactsListPath, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    const contactsList = JSON.parse(
      await fs.readFile(contactsListPath, "utf-8")
    );
    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(
      ({ id }) => id.toString() === contactId.toString()
    );
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    if (!(await getContactById(contactId))) {
      return;
    }
    const contactsList = await listContacts();
    const newContactList = contactsList.filter(
      ({ id }) => id.toString() !== contactId.toString()
    );
    await writeNewContactsList(newContactList);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();
    const newContactList = [...contactsList, body];
    await writeNewContactsList(newContactList);
    return body;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactToUpdate = await getContactById(contactId);
    if (!contactToUpdate) return;

    const contactsList = await listContacts();
    const filteredContactList = contactsList.filter(
      ({ id }) => id.toString() !== contactId.toString()
    );
    const newContactData = { ...contactToUpdate, ...body };
    const newContactList = [...filteredContactList, newContactData];
    await writeNewContactsList(newContactList);
    return newContactData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
