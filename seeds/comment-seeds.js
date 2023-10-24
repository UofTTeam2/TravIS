// Desc: This file is Used to seed the comment table in the database. Also class methods for likes and dislikes
// =============================================================

// Importing the Comment model
// =============================================================
const { Comment } = require('../models');
// =============================================================

// Creating the Comment seeds
// =============================================================
const commentData = [
    {
        comment: 'This is a comment',
        date_created: '2021-08-01',
        user_id: 1,
        parent_comment_id: null,
    },
    {
        comment: 'This is another comment',
        date_created: '2021-08-02',
        user_id: 2,
        parent_comment_id: null,
    },
    {
        comment: 'This is a reply to the first comment',
        date_created: '2021-08-03',
        user_id: 3,
        parent_comment_id: 1,
    },
    {
        comment: 'This is a reply to the second comment',
        date_created: '2021-08-04',
        user_id: 4,
        parent_comment_id: 2,
    },
    {
        comment: 'This is a reply to the second comment',
        date_created: '2021-08-05',
        user_id: 5,
        parent_comment_id: 2,
    },
];
// =============================================================

// Creating and exporting the Comment seeds
// =============================================================
const seedComments = () => Comment.bulkCreate(commentData);
// =============================================================
module.exports = seedComments;
