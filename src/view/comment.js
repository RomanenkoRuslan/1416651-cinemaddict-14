import {createElement} from '../util.js';

const createComment = (comment) => {
  const {textComment, emoji, authorComment, dateComment} = comment;
  const newDateFormat = dateComment.format('DD/MMMM/YYYY HH:mm');

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${textComment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${authorComment}</span>
      <span class="film-details__comment-day">${newDateFormat}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export default class Comment {
  constructor (coments) {
    this._coments = coments;
    this._element = null;
  }

  getTemplate () {
    return createComment(this._coments);
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
