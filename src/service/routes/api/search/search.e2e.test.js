'use strict';

const express = require(`express`);
const request = require(`supertest`);
const searchRouter = require(`../search`);
const {describe, beforeAll, test, expect} = require(`@jest/globals`);
const {HttpCode} = require(`../../../utils/_constants`);
const {readFile} = require(`../../../utils/_utils`);

const app = express();
app.use(`/api`, searchRouter);
app.use(express.json());

describe(`API returns publications based on query`, () => {

  let response;

  beforeAll(async () => {
    const mocks = await readFile(`./mocks.json`);
    app.set(`mocks`, JSON.parse(mocks));

    response = await request(app)
      .get(`/api/search`)
      .query({
        query: `Лучшие`
      });
  });

  test(`/api/search?query status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`/api/search?query founded publications >= 1`, () => expect(response.res.text.length).toBeGreaterThanOrEqual(1));
});


test(`/api/search?query status code 404, not found`, () => request(app)
  .get(`/api/search`)
  .query({
    query: `квери`
  })
  .expect(HttpCode.NOT_FOUND)
);


test(`/api/search?query status code 400, bad request`, () => request(app)
  .get(`/api/search`)
  .expect(HttpCode.BAD_REQUEST)
);
