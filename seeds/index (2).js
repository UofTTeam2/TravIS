const sequelize = require('../config/connection');
const seedTopic = require('./topicData');
const seedPost = require('./postData');
const seedComment = require('./commentData');
const seedUser = require('./userData');
const seedLikes = require('./likesData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedTopic();

  await seedPost();

  await seedComment();

  await seedLikes();

  process.exit(0);
};

seedAll();
