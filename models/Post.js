// Desc: Creating a model for the Post table in the database.
// Author: Cristiano Barboza Godinho
// =============================================================

// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the Post model
// =============================================================
class Post extends Model {}
// =============================================================

// Creating the Post table
// =============================================================
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);
// =============================================================

// Exporting the Post model
// =============================================================
module.exports = Post;
