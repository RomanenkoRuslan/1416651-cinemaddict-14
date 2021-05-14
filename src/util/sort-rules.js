export const sortListRated = (a, b) => {
  return b.rating - a.rating;
};

export const sortListCommented = (a, b) => {
  return b.commentSum - a.commentSum;
};

export const sortListDate = (a, b) => {
  return b.date - a.date;
};

