import dayjs from 'dayjs';

//Возвращает рандом дату
const getRandomDate = (start = new Date(2010, 12, 31), end =  new Date()) => {
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dayjs(newDate);
};

export {getRandomDate};
