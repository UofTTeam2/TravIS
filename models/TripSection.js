// Desc: Creating a model for the TripSection table in the database. Representing the trips related to a trip.
// =============================================================

// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the TripSection model
// =============================================================
class TripSection extends Model {}
// =============================================================

// Creating the TripSection table
// =============================================================
TripSection.init(
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
        modelName: 'tripsection',
    }
);
// =============================================================

// Export the TripSection model
// =============================================================
module.exports = TripSection;
