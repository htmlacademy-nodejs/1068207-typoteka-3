'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const request = require(`supertest`);
const {describe, beforeAll, test, expect} = require(`@jest/globals`);
const articlesRouter = require(`../articles`);
const {HttpCode} = require(`../../../utils/_constants`);
const {readFile} = require(`../../../utils/_utils.js`);


const createAPI = async () => {
  const app = express();
  app.use(express.json());
  app.use(`/api`, articlesRouter);
  const mocks = await readFile(`./mocks.json`);
  app.set(`mocks`, JSON.parse(mocks));
  return app;
};


describe(`API returns list of all publications`, () => {

  let response;
  let publications;

  beforeAll(async () => {
    const app = await createAPI();

    response = await request(app)
      .get(`/api/articles`);
    publications = JSON.parse(response.res.text);
  });

  test(`/api/articles status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`/api/articles returns array.length === 5`, () => expect(publications.length).toBe(5));
  test(`/api/articles returns array`, () => expect(Array.isArray(publications)).toBe(true));

});

describe(`API returns a publication with given id`, () => {

  let response;
  let publication;

  beforeAll(async () => {
    const app = await createAPI();

    response = await request(app)
      .get(`/api/articles/KyFGAFg69pIsrMr0Cq_Hg`);
    publication = JSON.parse(response.res.text);
  });

  test(`/api/articles status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`/api/articles/:articleId check publication property`, () => expect(publication).toHaveProperty(`title`));

});

describe(`API returns errors get /api/articles`, () => {

  let response;
  let publication;

  beforeAll(async () => {
    const app = await createAPI();

    response = await request(app)
      .get(`/api/articles/KyFGAFg69pIsrMr0Cq_Hgl`);
    publication = JSON.parse(response.res.text);
  });

  test(`/api/articles/:articleId status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
  test(`/api/articles:articleId empty object`, () => expect(Object.keys(publication).length).toBe(0));
});

describe(`API creates new publication if its data is valid`, () => {
  const newPublication = {
    title: `Очень большая биба`,
    announce: [`Текст объявления`],
    fullText: [`Текст объявления`, `Полный текст объявления`],
    categories: [`Музыка`],
    picture: `item14.jpg`
  };
  let response;
  let returnedPublication;
  let app;

  (async () => {
    app = await createAPI();
  })();

  beforeAll(async () => {

    response = await request(app)
      .post(`/api/articles`)
      .send(newPublication);

    returnedPublication = JSON.parse(response.res.text);
  });

  test(`POST /api/articles status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`POST /api/articles returned object contains propery id`, () =>
    expect(returnedPublication).toHaveProperty(`id`));

  test(`Publications count increased after newPublication is createad`, () => {
    return request(app)
      .get(`/api/articles`)
      .expect((respond) => expect(JSON.parse(respond.res.text).length).toBe(6));
  });
});

describe(`API creates new publication if its data is valid`, () => {
  const newPublication = {
    title: `Очень большая биба`,
    announce: [`Текст объявления`],
    fullText: [`Текст объявления`, `Полный текст объявления`],
    categories: [`Музыка`],
    picture: `item14.jpg`
  };
  let app;

  (async () => {
    app = await createAPI();
  })();

  test(`POST /api/articles returns 404, if required property doesnt exist on createdPublication`, async () => {
    for (const key of Object.keys(newPublication)) {
      const badPulication = {...newPublication};
      delete badPulication[key];
      await request(app)
        .post(`/api/articles`)
        .send(badPulication)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API updates exising publication`, () => {
  const newPublication = {
    title: `Очень большая биба`,
    announce: [`Текст объявления`],
    fullText: [`Текст объявления`, `Полный текст объявления`],
    categories: [`Музыка`],
    picture: `item14.jpg`
  };


  let app;
  let response;
  let returnUpdatedPublication;

  (async () => {
    app = await createAPI();
  })();

  beforeAll(async () => {
    response = await request(app)
      .put(`/api/articles/KyFGAFg69pIsrMr0Cq_Hg`)
      .send(newPublication);
    returnUpdatedPublication = JSON.parse(response.res.text);
  });

  test(`PUT /api/articles/:articleId status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`PUT /api/articles/:articleId returns changed publication`, () =>
    expect(returnUpdatedPublication)
      .toEqual(expect.objectContaining(newPublication)));
  test(`PUT /api/articles/:articleId really changes publication`, () =>
    expect(returnUpdatedPublication.title).toBe(newPublication.title));

});

describe(`PUT /api/articles/:articleId bad cases`, () => {
  const newPublication = {
    title: `Очень большая биба`,
    announce: [`Текст объявления`],
    fullText: [`Текст объявления`, `Полный текст объявления`],
    categories: [`Музыка`],
    picture: `item14.jpg`
  };

  test(`PUT /api/articles/:articleId status code 400`, async () => {
    const app = await createAPI();
    await request(app)
      .put(`/api/articles/ASD2`)
      .send(newPublication)
      .expect((res) => expect(res.statusCode).toBe(HttpCode.NOT_FOUND));
  });

  test(`API returns status code 400 when trying to change a publication with invalid data`, async () => {

    const app = await createAPI();

    const invalidPublication = {
      kek: `kok`,
      mem: `dikc`
    };

    return request(app)
      .put(`/api/articles/123`)
      .send(invalidPublication)
      .expect(HttpCode.BAD_REQUEST);
  });

});

describe(`API correctly deletes publication`, () => {
  let app;
  let response;
  let deletedPublication;

  (async () => {
    app = await createAPI();
  })();

  beforeAll(async () => {
    response = await request(app)
      .delete(`/api/articles/KyFGAFg69pIsrMr0Cq_Hg`);
    deletedPublication = JSON.parse(response.res.text);
  });

  test(`DELETE /api/articles/:articleId`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`DELETE /api/articles/:articleId returns deleted publication`, () =>
    expect(deletedPublication.id).toBe(`KyFGAFg69pIsrMr0Cq_Hg`));
  test(`DELETE /api/articles/:articleId returns publication count - 1`, async () => {
    await request(app)
      .get(`/api/articles`)
      .expect((res) => expect((JSON.parse(res.res.text).length)).toBe(4));
  });

});

test(`DELETE /api/articles/:articleId refuse to delete non-existent publication`, async () => {
  const app = await createAPI();

  await request(app)
    .delete(`/api/articles/123`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correctly deletes publication's comment`, () => {
  let app;
  let response;
  let deletedComment;

  (async () => {
    app = await createAPI();
  })();

  beforeAll(async () => {
    response = await request(app)
      .delete(`/api/articles/KyFGAFg69pIsrMr0Cq_Hg/comments/Bzdx-JmlqW22sxuJoOent`);
    deletedComment = JSON.parse(response.res.text);
  });

  test(`DELETE /api/articles/:articleId/comments/:commentId`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`DELETE /api/articles/:articleId/comments/:commentId returns deleted comment`, () =>
    expect(deletedComment.id).toBe(`Bzdx-JmlqW22sxuJoOent`));
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {

  const app = await createAPI();

  await request(app)
    .post(`/api/articles/123/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, async () => {

  const app = await createAPI();

  await request(app)
    .delete(`/offers/KyFGAFg69pIsrMr0Cq_Hg/comments/123`)
    .expect(HttpCode.NOT_FOUND);

});


// test(`/api/articles status code 404, not found`, () => request(app)
//   .get(`/api/article`)
//   .expect(HttpCode.NOT_FOUND)
// );

