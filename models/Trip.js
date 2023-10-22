// Desc: Creating a model for the Trip table in the database.
//This model will be used to query the database.
// =============================================================

// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the Trip model
// =============================================================
class Trip extends Model {}
// =============================================================

// Creating the Trip table
// =============================================================
Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },

        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'trip',
    }
);
// =============================================================

// Export the Trip model
// =============================================================
module.exports = Trip;
