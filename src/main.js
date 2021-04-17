import {filmsArray} from './moks/create-film.js';
import {renderElement, RenderPosition} from './util.js';
import FilmListView from './view/films-list';
import ProfileView from './view/profile';
import ShowMoreView from './view/show-more';
import SortView from './view/sort';
import CommentView from './view/comment.js';
import PopupView from './view/film-popup';
import MainNavigationView from './view/main-navigation';
import FilmView from './view/film-card';

const main = document.querySelector('.main');
const header = document.querySelector('.header');

renderElement(header, new ProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainNavigationView(filmsArray).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortView().getElement(), RenderPosition.BEFOREEND);

renderElement(main, new FilmListView().getElement(), RenderPosition.BEFOREEND);
const filmsListContainer = document.querySelector('.films-list__container--all-movies');
const filmsListContainerTopRated = document.querySelector('.films-list__container--top-rated');
const filmsListContainerMostCommented = document.querySelector('.films-list__container--most-commented');

//Все фильмы
const filmsList = document.querySelector('.films-list');
const STEPRENDERFILM = 5;
//Отрисовка всех фильмов
for (let i = 0; i < filmsArray.slice(0, STEPRENDERFILM).length; i++) {
  renderElement(filmsListContainer, new FilmView(filmsArray[i]).getElement(), RenderPosition.BEFOREEND);
}

//Отрисовка фильмов по клику
if (filmsArray.length > STEPRENDERFILM) {
  let renderedFilmCount = STEPRENDERFILM;

  //Отрисовка кнопки "Показать больше"
  renderElement(filmsList, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);
  const buttonShow = document.querySelector('.films-list__show-more');

  buttonShow.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + STEPRENDERFILM)
      .forEach((element) => {
        renderElement(filmsListContainer, new FilmView(element).getElement(), RenderPosition.BEFOREEND);
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
  renderElement(filmsListContainerTopRated, new FilmView(topRated[i]).getElement(), RenderPosition.BEFOREEND);
}

//Отрисовка самый комментируемый
//Сортировка по колличеству комментарий от большего к меньшему
const sortListCommented = (a, b) => {
  return b.commentSum - a.commentSum;
};
const mostCommented = filmsArray.slice().sort(sortListCommented);

for (let i = 0; i < COUNTFILMSMOSTCOMMENTED; i++) {
  renderElement(filmsListContainerMostCommented, new FilmView(mostCommented[i]).getElement(), RenderPosition.BEFOREEND);
}

const cardTitles = document.querySelectorAll('.film-card__title');
const cardComments = document.querySelectorAll('.film-card__comments');
const cardPosters = document.querySelectorAll('.film-card__poster');

//Создаем массив из элементов, которые открывают попап
const elementsOpenPopup = [...cardTitles, ...cardComments, ...cardPosters];
const body  = document.querySelector('body');

//Открываем попап по клику
elementsOpenPopup.forEach((element) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    //Отрисовка попапа
    const popup = main.appendChild(new PopupView(filmsArray[0]).getElement());

    //Отрисовка комментарий в попапе
    const commentsList = document.querySelector('.film-details__comments-list');
    for (let i = 0; i < filmsArray[0].comments.length; i++) {
      renderElement(commentsList, new CommentView(filmsArray[0].comments[i]).getElement(), RenderPosition.BEFOREEND);
    }

    body.setAttribute('class','hide-overflow');//убираем лишний скрол

    const closePopupButton = document.querySelector('.film-details__close-btn');

    //Убираем попап по клику
    closePopupButton.addEventListener('click', () => {
      main.removeChild(popup);
      body.removeAttribute('class');
    });

    //Убираем попап по ESC
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        main.removeChild(popup);
        body.removeAttribute('class');
      }
    });
  });

});


export {filmsArray};
