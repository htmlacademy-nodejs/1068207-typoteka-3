'use strict';

const {Router} = require(`express`);

const {readFile} = require(`../utils/_utils`);
const {HttpCode} = require(`../utils/_constants`);
const MOCK_FILE = `mocks.json`;

const articlesRouter = new Router();

articlesRouter.get(`/`, async (req, res) => {
  try {
    const result = await readFile(MOCK_FILE);
    return res.send(JSON.parse(result));
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).send(`[]`);
  }
});

module.exports = articlesRouter;
