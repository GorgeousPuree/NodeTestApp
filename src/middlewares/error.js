module.exports.errorHandler = (message, req, res) => {
  res.status(500).send({ message });
};
