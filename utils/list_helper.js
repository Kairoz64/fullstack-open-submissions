const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, v) => {
    return a + v.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return undefined;
  }

  let largestNumberIndex = 0;
  let largestNumber = 0;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > largestNumber) {
      largestNumber = blogs[i].likes;
      largestNumberIndex = i;
    }
  }

  return blogs[largestNumberIndex];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};