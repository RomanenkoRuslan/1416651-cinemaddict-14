import {getRandomItem, getRandomItemNoRepeat, getRandomFractionalNumber, getRandomInRange, getBoolean, getRandomDate} from '../util.js';
import {commentsArray} from './create-comment.js';

//Создаем фильм

const TITLEFILMS = ['The Dance of Life', 'Sagebrush Trail', 'The Man with the Golden Arm', 'Santa Claus Conquers the Martians', 'Popeye the Sailor Meets Sindbad the Sailor'];
const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const PRODUCERS = ['Steven Spielberg', 'Peter Jackson', 'Martin Scorsese', 'Christopher Nolan', 'Stephen Soderbergh', 'Quentin Tarantino', 'James Cameron'];
const SCREENWRITERS = ['Paul Savage', 'Richard Side', 'David Seidler', 'Ira Sachs', 'Peter Sullivan', 'Victor Salva', 'Keith Samples', 'Deran Sarafian'];
const ACTORS = ['Alan Rickman', 'Benedict Cumberbatch', 'Benicio del Toro', 'Nicole Kidman', 'James McAvoy', 'Daniel Day-Lewis', 'Daniel Radcliffe', 'Cillian Murphy', 'Christian Bale', 'Leonardo DiCaprio', 'Monica Bellucci', 'Tim Roth', 'Marilyn Monroe', 'Ornella Muti'];
const GENRES = ['Parodie', 'Western', 'Fairy Tale', 'Monster Stories', 'Romance', 'Tragedy'];
const COUNTRIES = ['Russia', 'USA', 'Chine', 'Poland', 'France', 'Spain', 'Canada'];
const description = descriptionText.split('. ');

const createFilm = () => {
  const comments = commentsArray.slice(0, getRandomInRange(1, 5));
  const date = getRandomDate(); //format dd mmmm yyyy
  return {
    idFilm: getRandomInRange(1000, 5000),
    title: getRandomItem(TITLEFILMS),
    isWatch: getBoolean(),
    isHistory: getBoolean(),
    isFavorite: getBoolean(),
    poster: 'the-man-with-the-golden-arm.jpg',
    description: getRandomItemNoRepeat(description),
    rating: getRandomFractionalNumber(1, 10, 1),
    producer: getRandomItem(PRODUCERS),
    screenwriter: getRandomItemNoRepeat(SCREENWRITERS),
    actor: getRandomItemNoRepeat(ACTORS),
    duration: `${getRandomInRange(0, 3)}h ${getRandomInRange(1, 60)}m`,
    genre: getRandomItem(GENRES),
    ageRating: `${getRandomInRange(0, 21)}+`,
    country: getRandomItem(COUNTRIES),
    date,
    comments,
    commentSum: comments.length,
  };
};

//Создания фильмов
const SUMMOKS = 18;
const filmsArray = new Array(SUMMOKS).fill().map(createFilm);

export {filmsArray};
