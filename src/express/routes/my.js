'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  return res.send(`Current route is /my`);
});

myRouter.get(`/comments`, (req, res) => {
  return res.send(`Current route is /my/comments`);
});

module.exports = myRouter;
