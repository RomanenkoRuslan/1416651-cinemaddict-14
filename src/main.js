import {filmsArray} from './moks/create-film.js';
import {renderElement, RenderPosition} from './util/render.js';
import FilmListView from './view/films-list.js';
import ProfileView from './view/profile.js';
import ShowMoreView from './view/show-more.js';
import SortView from './view/sort.js';
import CommentView from './view/comment.js';
import PopupView from './view/film-popup.js';
import MainNavigationView from './view/main-navigation.js';
import FilmView from './view/film-card.js';
import NoFilmMessage from './view/no-film-message.js';

const KEYCODEESC = 27;
const main = document.querySelector('.main');
const header = document.querySelector('.header');
const body  = document.querySelector('body');

renderElement(header, new ProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainNavigationView(filmsArray).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortView().getElement(), RenderPosition.BEFOREEND);

renderElement(main, new FilmListView().getElement(), RenderPosition.BEFOREEND);
const filmsListContainer = document.querySelector('.films-list__container--all-movies');
const filmsListContainerTopRated = document.querySelector('.films-list__container--top-rated');
const filmsListContainerMostCommented = document.querySelector('.films-list__container--most-commented');

if (filmsArray.length === 0) {
  renderElement(filmsListContainer, new NoFilmMessage().getElement(), RenderPosition.BEFOREEND);
}

const filmCardClickHandler = () => {
  const PopupFilm = new PopupView(filmsArray[0]);

  //Отрисовка попапа
  const popup = main.appendChild(PopupFilm.getElement());

  //Отрисовка комментарий в попапе
  const commentsList = document.querySelector('.film-details__comments-list');
  for (let i = 0; i < filmsArray[0].comments.length; i++) {
    renderElement(commentsList, new CommentView(filmsArray[0].comments[i]).getElement(), RenderPosition.BEFOREEND);
  }

  body.setAttribute('class','hide-overflow');//убираем лишний скрол

  //Убираем попап по клику
  PopupFilm.clickPopupHandler(() => {
    main.removeChild(popup);
    body.removeAttribute('class');
  });

  //Убираем попап по ESC
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === KEYCODEESC) {
      popup.remove();
      body.removeAttribute('class');
    }
  });
};

//Все фильмы
const filmsList = document.querySelector('.films-list');
const STEPRENDERFILM = 5;

//Отрисовка всех фильмов
for (let i = 0; i < filmsArray.slice(0, STEPRENDERFILM).length; i++) {
  const filmCard = new FilmView(filmsArray[i]);
  filmCard.addClickHandler(filmCardClickHandler);
  renderElement(filmsListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
}

//Отрисовка фильмов по клику
if (filmsArray.length > STEPRENDERFILM) {
  let renderedFilmCount = STEPRENDERFILM;
  const buttonShow = new ShowMoreView();

  //Отрисовка кнопки "Показать больше"
  renderElement(filmsList, buttonShow.getElement(), RenderPosition.BEFOREEND);

  buttonShow.addClickButtonHandler(() => {
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + STEPRENDERFILM)
      .forEach((element) => {
        const filmCard = new FilmView(element);
        filmCard.addClickHandler(filmCardClickHandler);
        renderElement(filmsListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
      });

    renderedFilmCount += STEPRENDERFILM;

    if (filmsArray.length <= renderedFilmCount) {
      buttonShow.removeButtonHandler();
    }
  });
}

const COUNTFILMSTOPRATED = 2;
const COUNTFILMSMOSTCOMMENTED = 2;

//Отрисовка топ рейтинга
//Сортировка по рейтингу от большего к меньшему
const sortListRated = (a, b) => {
  return b.rating - a.rating;
};

//Сортировка по рейтингу
const topRated = filmsArray.slice().sort(sortListRated);

if (topRated.length > 0) {
  for (let i = 0; i < COUNTFILMSTOPRATED; i++) {
    const filmCard = new FilmView(topRated[i]);
    filmCard.addClickHandler(filmCardClickHandler);

    renderElement(filmsListContainerTopRated, filmCard.getElement(), RenderPosition.BEFOREEND);
  }
}

//Отрисовка самый комментируемый
//Сортировка по колличеству комментарий от большего к меньшему
const sortListCommented = (a, b) => {
  return b.commentSum - a.commentSum;
};
const mostCommented = filmsArray.slice().sort(sortListCommented);

if (mostCommented.length > 0) {
  for (let i = 0; i < COUNTFILMSMOSTCOMMENTED; i++) {
    const filmCard = new FilmView(mostCommented[i]);
    filmCard.addClickHandler(filmCardClickHandler);
    renderElement(filmsListContainerMostCommented, filmCard.getElement(), RenderPosition.BEFOREEND);
  }
}

export {filmsArray};
