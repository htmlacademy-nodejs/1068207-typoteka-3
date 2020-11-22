'use strict';

const {Router} = require(`express`);

const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  return res.send(`Current route is /login`);
});

module.exports = loginRouter;
