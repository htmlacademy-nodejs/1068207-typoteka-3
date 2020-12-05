'use strict';

const {Router} = require(`express`);
const {body, validationResult} = require(`express-validator`);
const {nanoid} = require(`nanoid`);
const {HttpCode} = require(`../../../utils/_constants`);
const {getRandomDate} = require(`../../../utils/_utils`);

const articlesRouter = new Router();

// ресурс возвращает список публикаций;
articlesRouter.get(`/articles`, (req, res) => {
  const mocks = req.app.get(`mocks`);

  if (!Array.isArray(mocks) || !mocks.length) {
    return res.status(HttpCode.NOT_FOUND).send([]);
  }

  return res.send(JSON.stringify(mocks));
});

// возвращает полную информацию о публикации;
articlesRouter.get(`/articles/:articleId`, (req, res) => {
  const mocks = req.app.get(`mocks`);
  const {articleId} = req.params;

  const findedPublication = mocks.findIndex((publication) => publication.id === articleId);

  if (findedPublication === -1) {
    return res.status(HttpCode.NOT_FOUND).send({});
  }

  return res.send(JSON.stringify(mocks[findedPublication]));
});

// создаёт новую публикацию
articlesRouter.post(`/articles`, [
  body(`title`).isLength({min: 1}),
  body(`categories`).isArray().isLength({min: 1}),
  body(`fullText`).isArray().isLength({min: 1}),
  body(`announce`).isArray().isLength({min: 1}),
  body(`picture`).isLength({min: 1})
], (req, res) => {
  const mocks = req.app.get(`mocks`);
  const {title, categories, fullText, announce, picture} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).send(`Что-то пошло не так, проверьте правильность заполнения полей.`);
  }

  const newPublication = {
    id: nanoid(),
    createdDate: getRandomDate(),
    title,
    categories,
    fullText,
    announce,
    picture,
  };

  const newData = [...mocks, newPublication];

  req.app.set(`mocks`, newData);

  return res.send(JSON.stringify(newPublication));
});

// редактирует определённую публикацию;
articlesRouter.put(`/articles/:articleId`, (req, res) => {
  const mocks = req.app.get(`mocks`);
  const {articleId} = req.params;
  const newData = req.body;

  const findedPublication = mocks.findIndex((publication) => publication.id === articleId);

  if (findedPublication === -1) {
    return res.status(HttpCode.NOT_FOUND).send({});
  }

  const updatedPublication = {
    ...mocks[findedPublication],
    ...newData
  };

  mocks[findedPublication] = updatedPublication;

  req.app.set(`mocks`, mocks);

  return res.send(updatedPublication);

});

// удаляет определённое публикацию
articlesRouter.delete(`/articles/:articleId`, (req, res) => {
  const mocks = req.app.get(`mocks`);
  const {articleId} = req.params;
  const findedPublication = mocks.findIndex((publication) => publication.id === articleId);

  if (findedPublication === -1) {
    return res.status(HttpCode.NOT_FOUND).send({});
  }

  const newData = mocks.filter((publication) => publication.id !== articleId);

  req.app.set(`mocks`, newData);

  return res.send(`Публикация ${articleId} удалена`);
});

// возвращает список комментариев определённой публикации;
articlesRouter.get(`/articles/:articleId/comments`, (req, res) => {
  const mocks = req.app.get(`mocks`);
  const {articleId} = req.params;
  const findedPublication = mocks.findIndex((publication) => publication.id === articleId);

  if (findedPublication === -1) {
    return res.status(HttpCode.NOT_FOUND).send({});
  }

  const comments = mocks[findedPublication].comments;

  return res.send(JSON.stringify(comments));
});

// удаляет из определённой публикации комментарий с идентификатором

articlesRouter.delete(`/articles/:articleId/comments/:commentId`, (req, res) => {
  const mocks = req.app.get(`mocks`);
  const {articleId, commentId} = req.params;

  const findedPublication = mocks.findIndex((publication) => publication.id === articleId);

  if (findedPublication === -1) {
    return res.status(HttpCode.NOT_FOUND).send(`Can not find publication with id ${articleId}`);
  }

  const findedComment = mocks[findedPublication].comments.findIndex((comment) => comment.id === commentId);

  if (findedComment === -1) {
    return res.status(HttpCode.NOT_FOUND).send(`Can not find comments with id ${commentId}`);
  }

  const updatedPublication = {
    ...mocks[findedPublication],
    comments: mocks[findedPublication].comments.filter((comment) => comment.id !== commentId)
  };

  mocks[findedPublication] = updatedPublication;

  req.app.set(`mocks`, mocks);

  return res.send(`Комментарий ${commentId} удален`);
});

articlesRouter.post(`/articles/:articleId/comments`,
    [body(`text`).isLength({min: 1})],
    (req, res) => {
      const mocks = req.app.get(`mocks`);
      const {articleId} = req.params;
      const {text} = req.body;

      const findedPublication = mocks.findIndex((publication) => publication.id === articleId);

      if (findedPublication === -1) {
        return res.status(HttpCode.NOT_FOUND).send(`Can not find publication with id ${articleId}`);
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(HttpCode.BAD_REQUEST).send(`Something goes wrong, try again later`);
      }

      const newComment = {
        id: nanoid(),
        text
      };

      mocks[findedPublication].comments.push(newComment);

      req.app.set(`mocks`, mocks);

      return res.send(JSON.stringify(newComment));
    });

module.exports = articlesRouter;
