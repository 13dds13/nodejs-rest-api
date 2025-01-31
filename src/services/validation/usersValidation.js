const Joi = require("joi");

const schemaAuth = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk"] },
    })
    .required(),

  password: Joi.string().min(6).max(12).required(),
});

const schemaUsersSubscriptionUpdate = Joi.object().keys({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = { schemaAuth, schemaUsersSubscriptionUpdate };
