const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnathorizedError('Неверная подпись токена'));
  }

  req.user = payload;
  return next();
};
