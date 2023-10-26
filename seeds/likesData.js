const { Likes } = require('../models');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const likesdata = Array(1000).fill().map(() => ({
  user_id: getRandomNumber(1, 29),
  comment_id: getRandomNumber(1, 700),
}));

/*
const likesdata = [
  {
    user_id: 1,
    comment_id: 1,
  },
  {
    user_id: 2,
    comment_id: 2,
  }
];
*/

const seedLikes = () => Likes.bulkCreate(likesdata);

module.exports = seedLikes;