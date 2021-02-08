const express = require('express');
const authRouter = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

authRouter.post('/signup', (req, res, next) => {
  Admin.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

authRouter.post('/signin', (req, res, next) => {
  Admin.findOne({ login: req.body.login })
    .then((user) => {
      if (!user) throw new Error('Користувач не знайдений');
      if (user.password === req.body.password) {
        const username = req.body.login;
        const user = { name: username };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.send({ accessToken: accessToken });
      } else {
        throw new Error('Пароль не належить данному користувачу');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send({ error: err.message });
    });
});

module.exports = authRouter;
