import dayjs from 'dayjs';

// Рандом число в диапазоне
const getRandomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    return alert('Максимальное значение не может быть меньше минимальной!');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Рандом число в диапазоне с плавающей точкой
const getRandomFractionalNumber = (min, max, symbol) => {
  if (min > max) {
    return alert('Максимальное значение не может быть меньше минимальной!');
  }

  return (Math.random() * (max - min) + min).toFixed(symbol);
};

// Рандом элемент в массиве
const getRandomItem = (arr) => {
  const randomItemIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomItemIndex];
  return randomItem;
};

// Рандом элементы в массиве без повторения и с рандом количеством
const getRandomItemNoRepeat = (arr) => {
  for (let i = 0 ; i < arr.length; i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const city = arr[r];
    arr[r] = arr[i];
    arr[i] = city;
  }

  const sumElements = getRandomInRange(0, arr.length - 1);

  return arr.slice(sumElements);
};

//Возвращает boolean
const getBoolean = () => {
  return Boolean(getRandomInRange(0, 1));
};

//Возвращает рандом дату
const getRandomDate = (start = new Date(2010, 12, 31), end =  new Date()) => {
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dayjs(newDate);
};

//Создает элемент
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export {getRandomItem, getRandomItemNoRepeat, getRandomFractionalNumber, getRandomInRange, getBoolean, getRandomDate, renderTemplate, renderElement, createElement, RenderPosition};
