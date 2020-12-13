'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {
  ExitCode,
  PictureRestrict,
  MAX_ANNOUNCE_SENTENCES_COUNT,
  CURRENT_MONTH,
  CURRENT_YEAR,
  DATES_PERIOD
} = require(`../utils/_constants`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomArrayLength = (someArray, limit) => {
  const shuffledArray = shuffle(someArray);

  return shuffledArray
    .slice(0, getRandomInt(1, limit || shuffledArray.length));
};

const readFile = async (path) => {
  try {
    const readedFile = await fs.readFile(path, `utf-8`);
    return readedFile.split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

const generateDates = () => {
  const start = CURRENT_MONTH - DATES_PERIOD;
  let result = [];

  for (let i = 0; i < DATES_PERIOD; i++) {
    const randomMonth = getRandomInt(start, CURRENT_MONTH);

    const createdDate = new Date(
        CURRENT_YEAR,
        randomMonth,
        getRandomInt(1, 30),
        getRandomInt(0, 24),
        getRandomInt(0, 59),
        getRandomInt(0, 59)
    ).toJSON().slice(0, 19).replace(`T`, ` `);

    result.push(createdDate);
  }

  return result;
};

const DATES = generateDates();

const getRandomDate = () => {
  return DATES[getRandomInt(0, DATES.length - 1)];
};

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateComment = (commentsList) => {
  return shuffle(commentsList)
    .slice(0, getRandomInt(1, commentsList.length - 1))
    .map((text) => ({id: nanoid(), text}));
};


const generatePublications = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(),
    title: titles[getRandomInt(0, titles.length - 1)],
    publicationDate: DATES[getRandomInt(0, DATES.length - 1)],
    categories: getRandomArrayLength(categories, 3),
    announce: getRandomArrayLength(sentences, MAX_ANNOUNCE_SENTENCES_COUNT),
    fullText: getRandomArrayLength(sentences),
    comments: generateComment(comments),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
  }))
);

const callError = (errorMessage) => {
  console.error(chalk.red(`${errorMessage}`));
  return process.exit(ExitCode.error);
};

const setMocks = async (app) => {
  const mocks = await readFile(`./mocks.json`);
  app.set(`mocks`, mocks);
};

module.exports = {
  shuffle,
  getRandomInt,
  getRandomArrayLength,
  readFile,
  generatePublications,
  callError,
  getRandomDate,
  setMocks
};
