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
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        start_time: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        end_time: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
            },
        },
        notes: {
            type: DataTypes.STRING,
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
