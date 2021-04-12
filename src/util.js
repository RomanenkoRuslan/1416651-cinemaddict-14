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
const getRandomDate = (start = new Date(2010, 12, 31), end =  new Date(), format = 'DD MMMM YYYY') => {
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dayjs(newDate).format(format);
};

//Возвращает рандом дату и время
const getRandomDateTime = (start = new Date(2010, 12, 31), end =  new Date(), format = 'DD MMMM YYYY HH:mm') => {
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dayjs(newDate).format(format);
};

export {getRandomItem, getRandomItemNoRepeat, getRandomFractionalNumber, getRandomInRange, getBoolean, getRandomDate ,getRandomDateTime};
