// // Desc: This file is Used to seed the Message table in the database
// // =============================================================

// // Importing the Message model
// // =============================================================
// const { Message } = require('../models');
// // =============================================================

// // Creating the Message seeds
// // =============================================================
// const messageData = [
//     {
//         title: 'Message 1',
//         note: 'This is the first message',
//         image: 'https://www.google.com',
//         user_id: 1,
//     },
//     {
//         title: 'Message 2',
//         note: 'This is the second message',
//         image: 'https://www.google.com',
//         user_id: 2,
//     },
//     {
//         title: 'Message 3',
//         note: 'This is the third message',
//         image: 'https://www.google.com',
//         user_id: 3,
//     },
//     {
//         title: 'Message 4',
//         note: 'This is the fourth message',
//         image: 'https://www.google.com',
//         user_id: 4,
//     },
//     {
//         title: 'Message 5',
//         note: 'This is the fifth message',
//         image: 'https://www.google.com',
//         user_id: 5,
//     },
// ];
// // =============================================================

// // Creating and exporting the Message seeds
// // =============================================================
// const seedMessages = () => Message.bulkCreate(messageData);
// // =============================================================
// module.exports = seedMessages;
