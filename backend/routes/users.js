const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, getCurrentUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const { URL_REG_EXP } = require('../utils/constants');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REG_EXP),
  }),
}), updateUserAvatar);

module.exports = router;
