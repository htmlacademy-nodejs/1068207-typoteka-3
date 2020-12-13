'use strict';

require(`dotenv`).config();
const {Router} = require(`express`);
const axios = require(`axios`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  try {
    const result = await axios(`${process.env.API_URI}/api/articles`);
    return res.render(`my`, result);

  } catch (error) {
    return res.statusCode(req.statusCode).send(`Something goes wrong, try again later`);
  }
});

myRouter.get(`/comments`, async (req, res) => {
  const publications = req.app.get(`mocks`);

  try {
    const fetchedPublications = await Promise.all([
      axios(`${process.env.API_URI}/api/articles/${publications[0].id}/comments`),
      axios(`${process.env.API_URI}/api/articles/${publications[1].id}/comments`),
      axios(`${process.env.API_URI}/api/articles/${publications[2].id}/comments`)
    ]);

    const comments = [
      ...fetchedPublications[0].data,
      ...fetchedPublications[1].data,
      ...fetchedPublications[2].data,
    ];

    return res.render(`comments`, {comments});

  } catch (error) {
    return res.statusCode(req.statusCode).send(`Something goes wrong, try again later`);
  }
});

module.exports = myRouter;
