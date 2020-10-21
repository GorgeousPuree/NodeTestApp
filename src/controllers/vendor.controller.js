const { validationResult } = require("express-validator");

const vendorDb = require("../db/vendor.db");

exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await vendorDb.create(req.body);

  if (!result.succeeded) return next(result.message);

  if (result.succeeded && result.message && result.message.length !== 0) {
    return res.status(200).send({ message: result.message });
  }

  return res.status(201).send();
};

exports.findAll = async (req, res, next) => {
  const result = await vendorDb.findAll();

  if (!result.succeeded) return next(result.message);

  return res.status(200).send({ model: result.model });
};

exports.findOne = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await vendorDb.findOne(req.params.id);

  if (!result.succeeded) return next(result.message);

  if (result.succeeded && result.message && result.message.length !== 0) {
    return res.status(200).send({ message: result.message });
  }

  return res.status(200).send({ model: result.model });
};

exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await vendorDb.update(req.params.id, { id: req.params.id, name: req.body.name });

  if (!result.succeeded) return next(result.message);

  if (result.succeeded && result.message && result.message.length !== 0) {
    return res.status(200).send({ message: result.message });
  }

  return res.status(200).send();
};

exports.delete = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await vendorDb.delete(req.params.id);

  if (!result.succeeded) return next(result.message);

  if (result.succeeded && result.message && result.message.length !== 0) {
    return res.status(200).send({ message: result.message });
  }

  return res.status(200).send();
};
