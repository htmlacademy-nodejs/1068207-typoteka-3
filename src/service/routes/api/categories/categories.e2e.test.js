'use strict';

const express = require(`express`);
const request = require(`supertest`);
const categoriesRouter = require(`../categories`);
const {describe, beforeAll, test, expect} = require(`@jest/globals`);
const {HttpCode} = require(`../../../utils/_constants`);
const {readFile} = require(`../../../utils/_utils`);

const app = express();
app.use(`/api`, categoriesRouter);
app.use(express.json());

describe(`API returns catalog categories`, () => {
  const expected = [`Разное`, `IT`, `Музыка`];
  let response;
  let categories;

  beforeAll(async () => {
    let categoriesMocks = await readFile(`./data/categories.txt`);
    app.set(`categories`, categoriesMocks);
    response = await request(app)
      .get(`/api/categories`);

    categories = JSON.parse(response.res.text);
  });

  test(`/api/categories status 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`/api/categories returns array`, () => expect(Array.isArray(categories)).toBe(true));
  test(`/api/categories return contains 'Разное, IT, Музыка`, () =>
    expect(categories).toEqual(expect.arrayContaining(expected)));

});
