import {mainNavigationTemplate} from './view/main-navigation';
import {sortTemplate} from './view/sort';
import {profileTemplate} from './view/profile';
import {filmTemplate} from './view/film-card';
import {filmListTemplate} from './view/films-list';
import {showMoreTemplate} from './view/show-more';
import {filmsArray} from './moks/create-film.js';
import {popupTemplate} from './view/film-popup';
import {comment} from'./view/comment.js';

//функцию для отрисовки (вставки в DOM) компонент
const createElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector('.main');
const header = document.querySelector('.header');

createElement(header, profileTemplate(), 'beforeend');
createElement(main, mainNavigationTemplate(filmsArray), 'beforeend');
createElement(main, sortTemplate(), 'beforeend');

createElement(main, filmListTemplate(), 'beforeend');
const filmsListContainer = document.querySelector('.films-list__container--all-movies');
const filmsListContainerTopRated = document.querySelector('.films-list__container--top-rated');
const filmsListContainerMostCommented = document.querySelector('.films-list__container--most-commented');

//Все фильмы
const filmsList = document.querySelector('.films-list');
const STEPRENDERFILM = 5;
//Отрисовка всех фильмов
for (let i = 0; i < filmsArray.slice(0, STEPRENDERFILM).length; i++) {
  createElement(filmsListContainer, filmTemplate(filmsArray[i]), 'beforeend');
}

//Отрисовка фильмов по клику
if (filmsArray.length > STEPRENDERFILM) {
  let renderedFilmCount = STEPRENDERFILM;

  //Отрисовка кнопки "Показать больше"
  createElement(filmsList, showMoreTemplate(), 'beforeend');
  const buttonShow = document.querySelector('.films-list__show-more');

  buttonShow.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + STEPRENDERFILM)
      .forEach((element) => {
        createElement(filmsListContainer, filmTemplate(element), 'beforeend');
      });

    renderedFilmCount += STEPRENDERFILM;

    if (filmsArray.length <= renderedFilmCount) {
      buttonShow.remove();
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

for (let i = 0; i < COUNTFILMSTOPRATED; i++) {
  createElement(filmsListContainerTopRated, filmTemplate(topRated[i]), 'beforeend');
}

//Отрисовка самый комментируемый
//Сортировка по колличеству комментарий от большего к меньшему
const sortListCommented = (a, b) => {
  return b.commentSum - a.commentSum;
};
const mostCommented = filmsArray.slice().sort(sortListCommented);

for (let i = 0; i < COUNTFILMSMOSTCOMMENTED; i++) {
  createElement(filmsListContainerMostCommented, filmTemplate(mostCommented[i]), 'beforeend');
}

//Специально закомментирован, так как попап всплывает поверх всей страницы, что затрудняет работу над другими элементами

//Отрисовка попапа
createElement(filmsList, popupTemplate(filmsArray[0]), 'beforeend');

//Отрисовка комментарий в попапе
const commentsList = document.querySelector('.film-details__comments-list');
for (let i = 0; i < filmsArray[0].comments.length; i++) {
  createElement(commentsList, comment(filmsArray[0].comments[i]), 'beforeend');
}

export {filmsArray, createElement};
