import AbstractView from './abstract.js';

const createPopup = (film) => {
  const {title, description, rating, genre, duration, date, actor, producer, screenwriter, country, ageRating, commentSum, isWatch, isHistory, isFavorite} = film;
  const newFormatDate = date.format('DD MMMM YYYY');

  //Добавляем активность кнопок основываясь на полученнных данных
  let  watchClass = '';
  let  historyClass = '';
  let  favoriteClass = '';

  if (isWatch) {
    watchClass = 'checked="checked"';
  }

  if (isHistory) {
    historyClass = 'checked="checked"';
  }

  if (isFavorite) {
    favoriteClass = 'checked="checked"';
  }


  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${producer}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${screenwriter}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actor}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${newFormatDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchClass}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${historyClass}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteClass}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentSum}</span></h3>

        <ul class="film-details__comments-list">
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class Popup extends AbstractView {
  constructor (film) {
    super();
    this._film = film;
    this._popupClick = this._popupClick.bind(this);
    this._popupButtonClick = this._popupButtonClick.bind(this);
    this._onFilmWatchListClick = this._onFilmWatchListClick.bind(this);
    this._onFilmWatchedListClick = this._onFilmWatchedListClick.bind(this);
    this._onFilmFavoriteListClick = this._onFilmFavoriteListClick.bind(this);
    this._activeClass = 'checked';
  }

  getTemplate () {
    return createPopup(this._film );
  }

  _popupClick (evt) {
    evt.preventDefault();
    this._callback.onclickPopup();
  }

  _popupButtonClick () {
    this._callback.onclickButton();
  }

  clickPopupHandler (callback) {
    this._callback.onclickPopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupClick);
  }

  clickPopupButtonHandler (callback) {
    this._callback.onclickButton = callback;
    this.getElement().querySelector(this._classElementwatchlist).addEventListener('click', this._popupButtonClick);
    this.getElement().querySelector(this._classElementwatched).addEventListener('click', this._popupButtonClick);
    this.getElement().querySelector(this._classElementfavorite).addEventListener('click', this._popupButtonClick);
  }

  _onFilmWatchListClick() {
    this._elementClick = this.getElement().querySelector(this._classElementwatchlist);
    this._film.isWatch = this._elementClick.checked;
  }

  _onFilmWatchedListClick() {
    this._elementClick = this.getElement().querySelector(this._classElementwatched);
    this._film.isHistory = this._elementClick.checked;
  }

  _onFilmFavoriteListClick() {
    this._elementClick = this.getElement().querySelector(this._classElementfavorite);
    this._film.isFavorite = this._elementClick.checked;
  }

  clickStatusFilm () {
    this._classElementwatchlist = '#watchlist';
    this._classElementwatched = '#watched';
    this._classElementfavorite = '#favorite';
    this.getElement().querySelector(this._classElementwatchlist).addEventListener('click', this._onFilmWatchListClick);
    this.getElement().querySelector(this._classElementwatched).addEventListener('click', this._onFilmWatchedListClick);
    this.getElement().querySelector(this._classElementfavorite).addEventListener('click', this._onFilmFavoriteListClick);
  }
}
