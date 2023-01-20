const _ = require('lodash');

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  const count = _.countBy(blogs, 'author');
  const author = _.maxBy(Object.keys(count), o => count[o]);

  return { author, blogs: count[author] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};