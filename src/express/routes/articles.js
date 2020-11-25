'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => {
  return res.render(`articles-by-category`);
});

articlesRouter.get(`/add`, (req, res) => {
  return res.render(`new-post`);
});

articlesRouter.get(`/:id`, (req, res) => {
  return res.render(`post`);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  return res.render(`new-post`);
});

module.exports = articlesRouter;
