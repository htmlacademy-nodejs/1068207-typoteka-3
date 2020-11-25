'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  return res.render(`my`);
});

myRouter.get(`/comments`, (req, res) => {
  return res.render(`comments`);
});

module.exports = myRouter;
