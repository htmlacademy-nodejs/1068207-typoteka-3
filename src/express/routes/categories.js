'use strict';

const {Router} = require(`express`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => {
  return res.send(`Current route is /categories`);
});

module.exports = categoriesRouter;
