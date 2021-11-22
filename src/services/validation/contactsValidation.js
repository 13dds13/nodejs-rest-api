const Joi = require("joi");

const schemaPost = Joi.object({
  name: Joi.string().min(5).max(30).required(),

  phone: Joi.string().min(5).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaPut = Joi.object({
  name: Joi.string().min(5).max(30),

  phone: Joi.string().min(5).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "uk"] },
  }),
  favorite: Joi.boolean(),
});

const schemaPatchFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schemaPost, schemaPut, schemaPatchFavorite };
