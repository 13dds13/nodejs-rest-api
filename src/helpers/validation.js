const Joi = require("joi");

const schemaGenegal = Joi.object({
  name: Joi.string().min(5).max(30).required(),

  phone: Joi.string().min(5).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk"] },
    })
    .required(),
});

const schemaPatch = Joi.object({
  name: Joi.string().min(5).max(30),

  phone: Joi.string().min(5).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "uk"] },
  }),
});

module.exports = { schemaGenegal, schemaPatch };
