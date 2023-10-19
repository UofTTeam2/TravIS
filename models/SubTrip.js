// Desc: Creating a model for the SubTrip table in the database. Representing the trips related to a trip.
// =============================================================

// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the SubTrip model
// =============================================================
class SubTrip extends Model {}
// =============================================================

// Creating the SubTrip table
// =============================================================
SubTrip.init(
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

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: True,
            defaultValue: DataTypes.NOW,
        },

        trip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'subtrip',
    }
);
// =============================================================

// Export the SubTrip model
// =============================================================
module.exports = SubTrip;
