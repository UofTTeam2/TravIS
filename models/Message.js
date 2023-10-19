// Desc: This file contains the Message model for the database
// ==========================================================

// Dependencies
// ==========================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// ==========================================================

// Initialize Message model (table) by extending off Sequelize's Model class
// ==========================================================
class Message extends Model {
    // defining a method to mark a message as read.
    // A static method which will be called directly from the Message model
    // the method will update the is_read column to true for a given message id
    //This will be used in the message-routes.js file
    static markAsRead(id) {
        return this.update(
            {
                is_read: true,
            },
            {
                where: {
                    id,
                },
            }
        );
    }
}
// ==========================================================

// Set up fields and rules for Message model
// ==========================================================
Message.init(
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

        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
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
        modelName: 'message',
    }
);
// ==========================================================

// Export Message model
// ==========================================================
module.exports = Message;
