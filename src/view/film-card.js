import AbstractView from './abstract.js';

const createFilmTemplate = (film) => {
  //Данные фильмом отсутвуют, прекратить выполнение при отсутствие фильмов
  if (!film) {
    return;
  }

  const {title, description, rating, genre, date, duration, commentSum, isWatch, isHistory, isFavorite} = film;

  const year = date.format('YYYY');
  //Добавляем активность кнопок основываясь на полученнных данных
  let  watchClass = '';
  let  historyClass = '';
  let  favoriteClass = '';

  if (isWatch) {
    watchClass = 'film-card__controls-item--active';
  }

  if (isHistory) {
    historyClass = 'film-card__controls-item--active';
  }

  if (isFavorite) {
    favoriteClass = 'film-card__controls-item--active';
  }

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${commentSum} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${historyClass}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchClass}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class Film extends AbstractView {
  constructor (film) {
    super();
    this._film = film;
  }

  getTemplate () {
    return createFilmTemplate(this._film);
  }
}

