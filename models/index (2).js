const User = require('./User');
const Topic = require('./Topic');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./Likes');

User.hasMany(Post, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Topic.hasMany(Post, {
    foreignKey: 'topic_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.belongsTo(Topic, {
    foreignKey: 'topic_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Comment.hasMany(Likes, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE',
});

User.hasMany(Likes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = {
  User,
  Topic,
  Post,
  Comment,
  Likes
};
