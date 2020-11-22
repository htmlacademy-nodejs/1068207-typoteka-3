'use strict';

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => {
  return res.send(`Current route is /register`);
});

module.exports = registerRouter;
