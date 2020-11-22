'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => {
  return res.send(`Current route is /articles/category/${req.params.id}`);
});

articlesRouter.get(`/add`, (req, res) => {
  return res.send(`Current route is /articles/add`);
});

articlesRouter.get(`/:id`, (req, res) => {
  return res.send(`Current route is /articles/${req.params.id}`);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  return res.send(`Current route is /articles/edit/${req.params.id}`);
});

module.exports = articlesRouter;
