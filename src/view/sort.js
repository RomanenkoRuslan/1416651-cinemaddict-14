import AbstractView from './abstract.js';
import {SortType} from '../const.js';

const createSortTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--default sort__button--active"  data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button--date"  data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--rating"  data-sort-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;
};

export default class Sort extends AbstractView {
  constructor () {
    super();
    this._sortModeHandler = this._sortModeHandler.bind(this);
  }

  getTemplate () {
    return createSortTemplate();
  }

  _sortModeHandler (evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    //Удаляем другие элементы с актив класс
    const activeSelector = '.sort__button--active';
    const yetActiveElement = this.getElement().querySelectorAll(activeSelector);
    yetActiveElement.forEach((element) => {element.classList.remove(this._activeClass);});

    //Добавляем active class
    this._activeClass = 'sort__button--active';
    if (evt.target.classList.contains(this._activeClass)) {
      evt.target.classList.remove(this._activeClass);
    } else {
      //Удаляем актив класс который стоит по default на сайте
      const defaultElement = this.getElement().querySelector('.sort__button--default');
      defaultElement.classList.remove(this._activeClass);
      evt.target.classList.add(this._activeClass);
      evt.preventDefault();
      this._callback(evt.target.dataset.sortType);
    }
  }

  addClickHandler(callback) {
    this._callback = callback;

    this.getElement().addEventListener('click', this._sortModeHandler);
  }
}
