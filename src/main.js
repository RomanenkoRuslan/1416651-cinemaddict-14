import {mainNavigationTemplate} from './view/main-navigation';
import {sortTemplate} from './view/sort';
import {profileTemplate} from './view/profile';
import {filmTemplate} from './view/film-card';
import {filmListTemplate} from './view/films-list';
import {showMoreTemplate} from './view/show-more';
// import {popupTemplate} from './view/film-popup';
import {filmsArray} from './moks/create-film.js';

//функцию для отрисовки (вставки в DOM) компонент
const createElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector('.main');
const header = document.querySelector('.header');

createElement(header, profileTemplate(), 'beforeend');
createElement(main, mainNavigationTemplate(), 'beforeend');
createElement(main, sortTemplate(), 'beforeend');

createElement(main, filmListTemplate(), 'beforeend');
const filmsListContainer = document.querySelector('.films-list__container--all-movies');
const filmsListContainerTopRated = document.querySelector('.films-list__container--top-rated');
const filmsListContainerMostCommented = document.querySelector('.films-list__container--most-commented');

//Все фильмы
const filmsList = document.querySelector('.films-list');

//Отрисовка всех фильмов
for (let i = 0; i <= filmsArray.length; i++) {
  createElement(filmsListContainer, filmTemplate(filmsArray[i]), 'beforeend');
}

//Отрисовка кнопки "Показать больше"
createElement(filmsList, showMoreTemplate(), 'beforeend');

const COUNTFILMSTOPRATED = 2;
const COUNTFILMSMOSTCOMMENTED = 2;

//Отрисовка топ рейтинга
for (let i = 1; i <= COUNTFILMSTOPRATED; i++) {
  createElement(filmsListContainerTopRated, filmTemplate(), 'beforeend');
}

//Отрисовка самый комментируемый
for (let i = 1; i <= COUNTFILMSMOSTCOMMENTED; i++) {
  createElement(filmsListContainerMostCommented, filmTemplate(), 'beforeend');
}

// //Отрисовка попапа
// createElement(filmsList, popupTemplate(), 'beforeend');
export {filmsArray};
