import AbstractView from './abstract.js';

const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">
  Show more</button>`;
};

export default class ShowMore extends AbstractView {
  constructor () {
    super();
    this._showMoreButtonClick = this._showMoreButtonClick.bind(this);
  }

  getTemplate () {
    return createShowMoreTemplate();
  }

  _showMoreButtonClick (evt) {
    evt.preventDefault();
    this._callback.onclick();
  }

  addClickButtonHandler (callback) {
    this._callback.onclick = callback;
    this.getElement().addEventListener('click', this._showMoreButtonClick);
  }

  removeButtonHandler () {
    this._element.remove();
  }
}

