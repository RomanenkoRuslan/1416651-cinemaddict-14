import {createElement} from '../util.js';

const createMainNavigationTemplate = (films) => {
  const sumHistory = [];
  const sumFavorite = [];
  const sumWatch = [];

  //Добавляем счетчики
  for (const film of films) {
    if (film.isHistory) {
      sumHistory.push(film);
    }

    if (film.isFavorite) {
      sumFavorite.push(film);
    }

    if (film.isWatch) {
      sumWatch.push(film);
    }
  }

  const watchlist = sumWatch.length;
  const history = sumHistory.length;
  const favorites = sumFavorite.length;

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span id="watchlist" class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span  id="history" class="main-navigation__item-count">${history}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span  id="favorites" class="main-navigation__item-count">${favorites}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class MainNavigation {
  constructor (films) {
    this._films = films;
    this._element = null;
  }

  getTemplate () {
    return createMainNavigationTemplate(this._films);
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
