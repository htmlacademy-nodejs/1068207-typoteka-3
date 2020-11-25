'use strict';

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => {
  return res.render(`sign-up`);
});

module.exports = registerRouter;
