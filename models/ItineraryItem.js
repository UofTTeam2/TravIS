// Desc: ItineraryItem model will represent all ItineraryItem that are related to a tripSection.
// =============================================================

// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// =============================================================

// Creating the ItineraryItem model
// =============================================================
class ItineraryItem extends Model {}
// =============================================================

// Creating the ItineraryItem table
// =============================================================

ItineraryItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        start_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        end_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        expense: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        trip_section_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tripsection',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'itineraryitem',
    }
);
// =============================================================

// Exporting the ItineraryItem model
// =============================================================
module.exports = ItineraryItem;
