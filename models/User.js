// // Desc: This file contains the User model for the database
// // =========================================================

// // Dependencies
// // =========================================================
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const bcrypt = require('bcrypt');
// // =========================================================

// // Define User Model
// // =========================================================
// class User extends Model {
//     checkPassword(loginPw) {
//         return bcrypt.compareSync(loginPw, this.password);
//     }
// }
// // =========================================================

// // Define Table Columns and Configuration
// // =========================================================
// User.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isAlphanumeric: true,
//                 len: [3, 30],
//             },
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true,
//                 isLowercase: true,
//             },
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 // Minimum eight characters, at least one letter and one number
//                 is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//             },
//         },
//     },
//     {
//         hooks: {
//             beforeCreate: async (newUserData) => {
//                 newUserData.email = await newUserData.email.toLowerCase();
//                 newUserData.password = await bcrypt.hash(
//                     newUserData.password,
//                     10
//                 );
//             },
//             beforeUpdate: async (updatedUserData) => {
//                 updatedUserData.email =
//                     await updatedUserData.email.toLowerCase();
//                 updatedUserData.password = await bcrypt.hash(
//                     updatedUserData.password,
//                     10
//                 );
//             },
//         },
//         sequelize,
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'user',
//     }
// );
// // =========================================================

// // Export User Model
// // =========================================================
// module.exports = User;
