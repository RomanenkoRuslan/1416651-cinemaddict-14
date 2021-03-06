import {getRandomItem, getRandomInRange} from '../util/common.js';
import {getRandomDate} from '../util/day.js';

const COMMENTS = ['Booooooooooring', 'Interesting setting and a good cast','Almost two hours? Seriously?', 'Goooood', 'It`s funny'];
const EMOJI = ['smile', 'sleeping','puke', 'angry'];
const AUTHOR = ['Tim Sharp', 'John Doe','Ruslan Wild', 'Oleg Tiger', 'Dima Old'];

//Создаем генератор комментарий
const createComment = () => {
  return {
    idComment: getRandomInRange(1000, 5000),
    textComment: getRandomItem(COMMENTS),
    emoji: getRandomItem(EMOJI),
    authorComment: getRandomItem(AUTHOR),
    dateComment: getRandomDate(),
  };
};

export {createComment};
