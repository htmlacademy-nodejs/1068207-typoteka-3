'use strict';

const fs = require(`fs`);
const {getRandomInt, getRandomArrayLength} = require(`../utils/_utils`);
const {ExitCode} = require(`../utils/_constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DATE_OBJECT = new Date();
const CURRENT_MONTH = DATE_OBJECT.getMonth();
const CURRENT_YEAR = DATE_OBJECT.getFullYear();
const DATES_PERIOD = 2;
const MAX_PUBLICATIONS_COUNT = 1000;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

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


const generatePublications = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: DATES[getRandomInt(0, DATES.length - 1)],
    category: getRandomArrayLength(CATEGORIES),
    announce: getRandomArrayLength(SENTENCES, MAX_ANNOUNCE_SENTENCES_COUNT),
    fullText: getRandomArrayLength(SENTENCES)
  }))
);

const callError = (errorMessage) => {
  console.error(`${errorMessage}`);
  return process.exit(ExitCode.error);
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = count > MAX_PUBLICATIONS_COUNT ?
      callError(`Не больше 1000 публикаций`) :
      parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generatePublications(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        callError(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};
