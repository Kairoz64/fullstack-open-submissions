const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, v) => {
    return a + v.likes;
  }, 0);
};

module.exports = {
  dummy,
  totalLikes
};