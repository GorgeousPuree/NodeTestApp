const categoryDb = require("../db/category.db");

exports.create = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  const result = await categoryDb.create(req.body);

  if (!result.succeeded) {
    next(result.message);
    return;
  }
  if (result.succeeded && result.message && result.message.length !== 0) {
    res.status(200).send({
      message: result.message,
    });
  } else res.status(201).send();
};

exports.findAll = async (req, res, next) => {
  const result = await categoryDb.findAll();

  if (!result.succeeded) {
    next(result.message);
    return;
  }
  if (result.succeeded && result.model) {
    res.status(200).send({
      model: result.model,
    });
  }
};

exports.findOne = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  const result = await categoryDb.findOne(req.params.id);

  if (!result.succeeded) {
    next(result.message);
    return;
  }

  if (result.succeeded && result.message && result.message.length !== 0) {
    res.status(200).send({
      message: result.message,
    });
  } else {
    res.status(200).send({
      model: result.model,
    });
  }
};

exports.update = async (req, res, next) => {
  if (!req.params.id || !req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const result = await categoryDb.update(req.params.id, { id: req.params.id, name: req.body.name });
  if (!result.succeeded) {
    next(result.message);
    return;
  }

  if (result.succeeded && result.message && result.message.length !== 0) {
    res.status(200).send({
      message: result.message,
    });
  } else res.status(200).send();
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const result = await categoryDb.delete(req.params.id);

  if (!result.succeeded) {
    next(result.message);
    return;
  }

  if (result.succeeded && result.message && result.message.length !== 0) {
    res.status(200).send({
      message: result.message,
    });
  } else res.status(200).send();
};
