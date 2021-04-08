import {getRandomItem, getRandomItemNoRepeat, getRandomFractionalNumber, getRandomInRange, getBoolean} from '../util.js';

//Создаем фильм

const TITLEFILMS = ['The Dance of Life', 'Sagebrush Trail', 'The Man with the Golden Arm', 'Santa Claus Conquers the Martians', 'Popeye the Sailor Meets Sindbad the Sailor'];
const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const PRODUCERS = ['Steven Spielberg', 'Peter Jackson', 'Martin Scorsese', 'Christopher Nolan', 'Stephen Soderbergh', 'Quentin Tarantino', 'James Cameron'];
const screenwriters = ['Paul Savage', 'Richard Side', 'David Seidler', 'Ira Sachs', 'Peter Sullivan', 'Victor Salva', 'Keith Samples', 'Deran Sarafian'];
const actors = ['Alan Rickman', 'Benedict Cumberbatch', 'Benicio del Toro', 'Nicole Kidman', 'James McAvoy', 'Daniel Day-Lewis', 'Daniel Radcliffe', 'Cillian Murphy', 'Christian Bale', 'Leonardo DiCaprio', 'Monica Bellucci', 'Tim Roth', 'Marilyn Monroe', 'Ornella Muti'];
const Genres = ['Parodie', 'Western', 'Fairy Tale', 'Monster Stories', 'Romance', 'Tragedy'];
const countries = ['Russia', 'USA', 'Chine', 'Poland', 'France', 'Spain', 'Canada'];
const mounth = ['January', 'Februery', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const description = descriptionText.split('. ');

const createFilm = () => {
  return {
    title: getRandomItem(TITLEFILMS),
    isWatchlist: getBoolean(),
    isWatched: getBoolean(),
    isFavorites: getBoolean(),
    poster: 'the-man-with-the-golden-arm.jpg',
    description: getRandomItemNoRepeat(description),
    rating: getRandomFractionalNumber(1, 10, 1),
    producer: getRandomItem(PRODUCERS),
    screenwriter: getRandomItemNoRepeat(screenwriters),
    actor: getRandomItemNoRepeat(actors),
    duration: `${getRandomInRange(0, 3)}h ${getRandomInRange(0, 60)}m`,
    genre: getRandomItem(Genres),
    comment: getRandomInRange(0, 5),
    ageRating: `${getRandomInRange(0, 21)}+`,
    country: getRandomItem(countries),
    year: `${getRandomInRange(1800, 2015)}`,
    date: `${getRandomInRange(0, 30)} ${getRandomItem(mounth)} ${getRandomInRange(1800, 2015)}`,
  };
};

//Создания фильмов
const SUMMOKS = 15;
const filmsArray = new Array(SUMMOKS).fill().map(createFilm);

export {filmsArray};
