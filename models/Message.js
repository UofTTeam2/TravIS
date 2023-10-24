// // Desc: This file contains the Message model for the database
// // ==========================================================

// // Dependencies
// // ==========================================================
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// // ==========================================================

// // Initialize Message model (table) by extending off Sequelize's Model class
// // ==========================================================
// class Message extends Model {}
// // ==========================================================

// // Set up fields and rules for Message model
// // ==========================================================
// Message.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },

//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         note: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         image: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             validate: {
//                 isUrl: true,
//             },
//         },

//         user_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'user',
//                 key: 'id',
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'message',
//     }
// );
// // ==========================================================

// // Export Message model
// // ==========================================================
// module.exports = Message;
