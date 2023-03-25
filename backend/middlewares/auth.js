const jwt = require('jsonwebtoken');
const { KEY } = require('../utils/constants');
const UnathorizedError = require('../errors/unathorized-error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, KEY);
  } catch (err) {
    return next(new UnathorizedError('Неверная подпись токена'));
  }

  req.user = payload;
  return next();
};
