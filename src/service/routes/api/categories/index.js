'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../utils/_constants`);

const categoriesRouter = new Router();

// возвращает список категорий;
categoriesRouter.get(`/categories`, (req, res) => {
  const categories = req.app.get(`categories`);

  if (!Array.isArray(categories) || !categories.length) {
    return res.status(HttpCode.NOT_FOUND).send([]);
  }

  return res.send(JSON.stringify(categories));
});


module.exports = categoriesRouter;
