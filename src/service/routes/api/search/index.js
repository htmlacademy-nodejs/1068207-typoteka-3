'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../utils/_constants`);

const searchRouter = new Router();

// поиск публикаций по заголовку
searchRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;
  const mocks = req.app.get(`mocks`);

  if (query === undefined) {
    return res.status(HttpCode.BAD_REQUEST).send(`Something goes wrong, try again later`);
  }

  const result = mocks.filter((publication) => publication.title.includes(query));

  return res.send(JSON.stringify(result));
});

module.exports = searchRouter;
