// Desc: Creating a model for the Topic table in the database.
// Author: Cristiano Barboza Godinho
// =============================================================

// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the Topic model
// =============================================================
class Topic extends Model {}
// =============================================================

// Creating the Topic table
// =============================================================
Topic.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        iconalt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'topic',
    }
);
// =============================================================

// Exporting the Topic model
// =============================================================
module.exports = Topic;
