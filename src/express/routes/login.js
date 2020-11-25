'use strict';

const {Router} = require(`express`);

const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  return res.render(`login`);
});

module.exports = loginRouter;
