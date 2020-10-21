// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (err, req, res, next) => {
  res.status(500).send({ message: err });
};
