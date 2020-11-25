'use strict';

const {Router} = require(`express`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => {
  return res.render(`all-categories`);
});

module.exports = categoriesRouter;
