// // Desc: This file is used to seed the User table in the database
// // =============================================================

// // Importing the User model
// // =============================================================
// const { User } = require('../models');
// // =============================================================

// // Creating the User seeds
// // =============================================================
// const userData = [
//     {
//         username: 'user1',
//         email: 'user1@example.com',
//         password: 'Password1',
//     },
//     {
//         username: 'user2',
//         email: 'user2@example.com',
//         password: 'Password2',
//     },
//     {
//         username: 'user3',
//         email: 'user3@example.com',
//         password: 'Password3',
//     },
//     {
//         username: 'user4',
//         email: 'user4@example.com',
//         password: 'Password4',
//     },
//     {
//         username: 'user5',
//         email: 'user5@example.com',
//         password: 'Password5',
//     },
// ];
// // =============================================================

// // Creating and exporting the User seeds
// // =============================================================
// const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });
// // =============================================================
// module.exports = seedUsers;
