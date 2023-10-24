// Desc: This file will represent the Comment model
// ****Note: Likes and Dislikes and be considered as a type of vote
// ==========================================================

// Dependencies
// =============================================================
// Import model, datatypes, and Op from sequelize
// Op is used to perform operations other than standard equals comparisons
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Create the Comment model, with methods
// =============================================================
// This Section will be used in further development
//to add and remove likes and dislikes
//to find comments with a minimum number of likes
//to find comments with a minimum number of dislikes
//to find comments with a maximum number of likes
//to find comments with a maximum number of dislikes
// =============================================================
class Comment extends Model {}
// =============================================================

// Initialize the Comment model
// =============================================================
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        len: [1, 1000],
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);
// =============================================================

// Export the Comment model
module.exports = Comment;