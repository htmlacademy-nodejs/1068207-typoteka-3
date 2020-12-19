'use strict';

require(`dotenv`).config();
const multer = require(`multer`);
const axios = require(`axios`);
const {Router} = require(`express`);
const upload = require(`../storage`);

const articlesRouter = new Router();


articlesRouter.get(`/category/:id`, (req, res) => {
  return res.render(`articles-by-category`);
});

articlesRouter.get(`/add`, (req, res) => {
  const fallbackData = {
    title: ``,
    categories: [],
    announce: [],
    fullText: [],
    picture: ``,
    publicationDate: ``
  };

  return res.render(`new-post`, {publication: {...fallbackData}});
});

articlesRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const {body, file} = req;
  const newPost = {...body};

  newPost.announce = newPost.announce.split(`.`);
  newPost.fullText = newPost.fullText.split(`.`);
  newPost.publicationDate = newPost.publicationDate.split(`.`).reverse().join(`-`);
  newPost.picture = (file && file.filename) || ``;
  newPost.categories = (newPost.categories && newPost.categories.filter(Boolean)) || [];

  try {
    await axios.post(`${process.env.API_URI}/api/articles`, newPost);
    return res.redirect(`/my`);
  } catch (error) {
    const currentSubmitedData = {...newPost};
    return res.render(`new-post`, {publication: currentSubmitedData});
  }
});

articlesRouter.get(`/:id`, (req, res) => {
  return res.render(`post`);
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  try {
    const result = await axios(`${process.env.API_URI}/api/articles/${id}`);
    return res.render(`edit.pug`, {publication: result.data});
  } catch (error) {

    if (error.response.status === 404) {
      return res.render(`errors/400`);
    }
  }

  return res.render(`new-post`);
});

module.exports = articlesRouter;
