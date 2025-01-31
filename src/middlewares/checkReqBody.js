const {
  schemaPost,
  schemaPatchFavorite,
  schemaPut,
} = require("../services/validation/contactsValidation");
const {
  schemaAuth,
  schemaUsersSubscriptionUpdate,
} = require("../services/validation/usersValidation");

const checkContactsReqBody = (req, res, next) => {
  const { method, body } = req;
  if (!body || method === "GET" || method === "DELETE") {
    next();
    return;
  }

  let schema = null;

  switch (method) {
    case "POST":
      schema = schemaPost;
      break;

    case "PUT":
      schema = schemaPut;
      break;

    default:
      schema = schemaPatchFavorite;
      break;
  }
  const { error } = schema.validate(body);
  if (!error) {
    next();
    return;
  }
  res.status(400).json({ message: error.message });
};

const checkUsersReqBody = (req, res, next) => {
  if (req.method === "PATCH") {
    const { error } = schemaUsersSubscriptionUpdate.validate(req.body);
    if (!error) {
      next();
      return;
    }
    res.status(400).json({ message: error.message });
    return;
  }
  const { error } = schemaAuth.validate(req.body);
  if (!error) {
    next();
    return;
  }
  res.status(400).json({ message: error.message });
};

module.exports = { checkContactsReqBody, checkUsersReqBody };
