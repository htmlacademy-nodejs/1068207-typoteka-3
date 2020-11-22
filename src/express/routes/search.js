'use strict';

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  return res.send(`Current route is /search`);
});

module.exports = searchRouter;
