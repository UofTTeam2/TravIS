// Desc: This file is the centeral hub for all models.
//It will import all models and export them as one object.
//Also will create associations between models.
// ====================================================

// Import all models
// ====================================================
const User = require('./User');
const Trip = require('./Trip');
const TripSection = require('./TripSection');
const ItineraryItem = require('./ItineraryItem');
const Comment = require('./Comment');
const Post = require('./Post');
const Topic = require('./Topic');
// ====================================================

// Create associations
// ====================================================

// User associations
//=====================================================
User.hasMany(Trip, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
/*User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});*/
//=====================================================

// Trip associations
//=====================================================
Trip.belongsTo(User, {
    foreignKey: 'user_id',
});
Trip.hasMany(TripSection, {
    foreignKey: 'trip_id',
    onDelete: 'CASCADE',
});
//=====================================================

// TripSection associations
//=====================================================
TripSection.belongsTo(Trip, {
    foreignKey: 'trip_id',
});
TripSection.hasMany(ItineraryItem, {
    foreignKey: 'trip_section_id',
    onDelete: 'CASCADE',
});
//=====================================================

// ItineraryItem associations
//=====================================================
ItineraryItem.belongsTo(TripSection, {
    foreignKey: 'trip_section_id',
});
//=====================================================

// Topic associations
//=====================================================
Topic.hasMany(Post, {
    foreignKey: 'topic_id',
    onDelete: 'CASCADE',
});
//=====================================================

// Post associations
//=====================================================
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
Post.belongsTo(Topic, {
    foreignKey: 'topic_id',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});
//=====================================================

// Comment associations
//=====================================================
/*Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});
Comment.belongsTo(Comment, {
    as: 'parent_comment',
    foreignKey: 'parent_comment_id',
});
Comment.hasMany(Comment, {
    as: 'child_comments',
    foreignKey: 'parent_comment_id',
    onDelete: 'CASCADE',
});*/
//=====================================================

// Export all models as one object
// ====================================================
module.exports = {
    User,
    Trip,
    TripSection,
    ItineraryItem,
    Post,
    Topic,
    Comment,
};
