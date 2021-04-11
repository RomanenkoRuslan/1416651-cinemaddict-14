const comment = (comment) => {
  const {textComment, emoji, authorComment, dateComment} = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${textComment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${authorComment}</span>
      <span class="film-details__comment-day">${dateComment}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export {comment};
