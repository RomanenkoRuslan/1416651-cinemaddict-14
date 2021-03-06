import {renderElement, RenderPosition, replace, remove} from '../util/render.js';
import FilmListView from '../view/films-list.js';
import ShowMoreView from '../view/show-more.js';
import SortView from '../view/sort.js';
import PopupView from '../view/film-popup.js';
import FilmView from '../view/film-card.js';
import NoFilmMessage from '../view/no-film-message.js';
import {sortListRated, sortListCommented, sortListDate} from '../util/sort-rules.js';
import {SortType} from '../const';

const KEYCODEESC = 27;
const STEPRENDERFILM = 5;
const COUNTFILMSTOPRATED = 2;
const COUNTFILMSMOSTCOMMENTED = 2;

const body  = document.querySelector('body');
const main = document.querySelector('.main');

export default class MovieList {
  constructor (container) {
    this._container = container;
    this._currentSortType = SortType.DEFAULT;

    this._sortView = new SortView();
    this._noFilmMessage = new NoFilmMessage();
    this._showMoreView = new ShowMoreView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  start (films) {
    this._defaultFilms = films;
    this._films = this._defaultFilms.slice();
    this._filmListView = new FilmListView();
    this._renderSortView();
    this._renderedFilmCount = Math.min(STEPRENDERFILM, this._films.length);
    renderElement(this._container, this._filmListView, RenderPosition.BEFOREEND);

    this._filmsListContainer = document.querySelector('.films-list__container--all-movies');
    this._filmsListContainerTopRated = document.querySelector('.films-list__container--top-rated');
    this._filmsListContainerMostCommented = document.querySelector('.films-list__container--most-commented');

    this._renderMovieBoard();
  }

  _getSortedFilms(sortType) {
    switch(sortType) {
      case SortType.DATE:
        return this._films.sort(sortListDate); //Сортировка по Дате
      case SortType.RATING:
        return this._films.sort(sortListRated); //Сортировка по Рейтингу
      case SortType.DEFAULT:
        this._films = this._defaultFilms;
        return this._films;
    }
  }

  //Отрисовка нового отсортировано списка по клику
  _handleSortTypeChange (sortType) {
    if (this._currentSortType !== sortType) {
      this._filmsListContainer.innerHTML = '';
      this._films = this._getSortedFilms(sortType);

      this._renderAllFilm();
      this._clickHandlerShowMore();

      this._currentSortType = sortType;
    }
  }

  _renderSortView () {
    renderElement(this._container, this._sortView, RenderPosition.BEFOREEND);
    this._sortView.addClickHandler(this._handleSortTypeChange);
  }

  _renderNoFilmMessage () {
    renderElement(this._filmsListContainer, this._noFilmMessage, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton () {
    renderElement(this._filmsListContainer, this._showMoreView, RenderPosition.BEFOREEND);
  }

  _clickHandlerShowMore () {
    //Отрисовка фильмов по клику
    //Отрисовка кнопки "Показать больше"
    this._renderShowMoreButton();

    if (this._films.length > STEPRENDERFILM) {
      this._renderedFilmCount = STEPRENDERFILM;

      this._showMoreView.addClickButtonHandler(() => {
        this._showMoreView.removeButtonHandler();
        this._films
          .slice(this._renderedFilmCount, this._renderedFilmCount + STEPRENDERFILM)
          .forEach((element) => {
            const filmCard = new FilmView(element);
            filmCard.addClickHandler(() => {this._renderPopup(element, filmCard);});
            renderElement(this._filmsListContainer, filmCard, RenderPosition.BEFOREEND);
            this._renderShowMoreButton();
            filmCard.clickStatusFilm();
          });

        this._renderedFilmCount += STEPRENDERFILM;

        if (this._films.length <= this._renderedFilmCount) {
          this._showMoreView.removeButtonHandler();
          this._renderedFilmCount = STEPRENDERFILM;
        }
      });
    }
  }

  _renderAllFilm () {
    //Отрисовка всех фильмов
    for (let i = 0; i < this._films.slice(0, this._renderedFilmCount).length; i++) {
      const filmCard = new FilmView(this._films[i]);
      filmCard.addClickHandler(() => {this._renderPopup(this._films[i], filmCard);});
      renderElement(this._filmsListContainer, filmCard, RenderPosition.BEFOREEND);
      filmCard.clickStatusFilm();
    }
  }

  _renderPopup (film, filmCard) {
    this._popupView = new PopupView(film);
    this._currentFilmCard = filmCard;

    this._popupView.clickPopupButtonHandler(() => {
      this._reRenderFilm(film);
    });

    //Отрисовка попапа
    main.appendChild(this._popupView.getElement());

    body.setAttribute('class','hide-overflow');//убираем лишний скрол

    //Убираем попап по клику
    this._popupView.clickPopupHandler(() => {
      remove(this._popupView);
      body.removeAttribute('class');
    });

    //Убираем попап по ESC
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === KEYCODEESC) {
        remove(this._popupView);
        body.removeAttribute('class');
      }
    });
  }

  _reRenderFilm (film) {
    const filmCard = new FilmView(film);
    filmCard.addClickHandler(() => {this._renderPopup(film, filmCard);});
    filmCard.clickStatusFilm();

    replace(filmCard, this._currentFilmCard);
    this._currentFilmCard = filmCard;
  }

  _renderTopRated () {
    //Сортировка по рейтингу
    const topRated = this._films.slice().sort(sortListRated);

    if (topRated.length > 0) {
      for (let i = 0; i < COUNTFILMSTOPRATED; i++) {
        const filmCard = new FilmView(topRated[i]);
        filmCard.addClickHandler(() => {this._renderPopup(topRated[i], filmCard);});
        renderElement(this._filmsListContainerTopRated, filmCard, RenderPosition.BEFOREEND);
        filmCard.clickStatusFilm();
      }
    }
  }

  _renderMostCommented () {
    const mostCommented = this._films.slice().sort(sortListCommented);

    if (mostCommented.length > 0) {
      for (let i = 0; i < COUNTFILMSMOSTCOMMENTED; i++) {
        const filmCard = new FilmView(mostCommented[i]);
        filmCard.addClickHandler(() => {this._renderPopup(mostCommented[i], filmCard);});
        renderElement(this._filmsListContainerMostCommented, filmCard, RenderPosition.BEFOREEND);
        filmCard.clickStatusFilm();
      }
    }
  }

  _renderMovieBoard () {
    if (this._films.length === 0) {
      this._renderNoFilmMessage();
    }

    this._renderAllFilm();
    this._renderTopRated();
    this._renderMostCommented();
    this._clickHandlerShowMore();
  }
}
