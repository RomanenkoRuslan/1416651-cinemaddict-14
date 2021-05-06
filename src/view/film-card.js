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
    this._cardClick = this._cardClick.bind(this);
    this._StatusFilmWatchList = this._StatusFilmWatchList.bind(this);
    this._StatusFilmWatched = this._StatusFilmWatched.bind(this);
    this._StatusFilmFavorite = this._StatusFilmFavorite.bind(this);
    this._activeClass = 'film-card__controls-item--active';
  }


  getTemplate () {
    return createFilmTemplate(this._film);
  }

  _cardClick (evt) {
    evt.preventDefault();
    this._callback.onclick();
  }

  addClickHandler (callback) {
    this._callback.onclick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._cardClick);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._cardClick);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._cardClick);
  }

  _StatusFilmWatchList(evt) {
    this._elementClick = this.getElement().querySelector(this._classElementwatchlist);
    evt.preventDefault();
    this._clickChangeList();
  }

  _StatusFilmWatched(evt) {
    this._elementClick = this.getElement().querySelector(this._classElementwatched);
    evt.preventDefault();
    this._clickChangeList();
  }

  _StatusFilmFavorite(evt) {
    this._elementClick = this.getElement().querySelector(this._classElementfavorite);
    evt.preventDefault();
    this._clickChangeList();
  }

  _clickChangeList () {
    if (this._elementClick.classList.contains(this._activeClass)) {
      this._elementClick.classList.remove(this._activeClass);
      this._film.isWatch = false;
    } else {
      this._elementClick.classList.add(this._activeClass);
      this._film.isWatch = true;
    }
    // console.log(this._film.isWatch);
  }

  clickStatusFilm () {
    // this._callback.onclick = callback;
    this._classElementwatchlist = '.film-card__controls-item--add-to-watchlist';
    this._classElementwatched = '.film-card__controls-item--mark-as-watched';
    this._classElementfavorite = '.film-card__controls-item--favorite';
    this.getElement().querySelector(this._classElementwatchlist).addEventListener('click', this._StatusFilmWatchList);
    this.getElement().querySelector(this._classElementwatched).addEventListener('click', this._StatusFilmWatched);
    this.getElement().querySelector(this._classElementfavorite).addEventListener('click', this._StatusFilmFavorite);
  }

}
