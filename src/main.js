import {filmsArray} from './moks/create-film.js';
import {renderElement, RenderPosition} from '../src/util/render.js';
import ProfileView from './view/profile.js';
import MainNavigationView from './view/main-navigation.js';

import movieListPresenter from '../src/presenter/movie-list.js';

const main = document.querySelector('.main');
const header = document.querySelector('.header');

renderElement(header, new ProfileView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainNavigationView(filmsArray).getElement(), RenderPosition.BEFOREEND);

const movieBoard = new movieListPresenter(main);
movieBoard.start(filmsArray);

export {filmsArray};
