const { updateContact } = require("../../model");

const updateRouterOperation = async (req, res, next) => {
  try {
    const data = req.body;
    (!data || !Object.keys(data).length) &&
      res.status(400).json({ message: "missing fields" });
    const contactId = req.params.contactId;
    const updatedContact = await updateContact(contactId, data);
    updatedContact ? res.json(updatedContact) : next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateRouterOperation };
