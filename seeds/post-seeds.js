// Desc: This file will be used to seed the Post table in the database.
// Author: Cristiano Barboza Godinho
// =============================================================

// Import the Post model
// =============================================================
const { Post } = require('../models');
// =============================================================

// Post data
// =============================================================
const loremIpsumStrings = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    'Aenean luctus rhoncus velit, in tincidunt ex consectetur quis.',
    'Fusce in venenatis dolor, nec vestibulum lorem.',
    'Pellentesque id sagittis felis, nec condimentum dui.',
    'Mauris auctor a orci nec hendrerit.',
    'Vestibulum nec sollicitudin quam.',
    'Cras quis feugiat elit, nec dictum elit.',
    'Aliquam nec est id urna accumsan convallis.',
    'Sed ullamcorper justo sit amet massa efficitur.',
    'In tincidunt tortor pellentesque bibendum.',
    'Proin efficitur sit amet quam vel facilisis.',
    'Nullam a vehicula felis, id tincidunt purus.',
    'Mauris non risus a velit posuere viverra.',
    'Curabitur fringilla ante sit amet nisl cursus, et rhoncus erat.',
    'Phasellus vestibulum congue tincidunt.',
    'Mauris at ligula nec neque efficitur tempus.',
];

const generateRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const postData = [];

for (let i = 1; i <= 99; i++) {
    const post = {
        subject:
            loremIpsumStrings[
                Math.floor(Math.random() * loremIpsumStrings.length)
            ],
        user_id: generateRandomInt(1, 5),
        topic_id: generateRandomInt(1, 6),
    };
    postData.push(post);
}
// =============================================================

// Creating the PostData array
// =============================================================
const seedPosts = () => Post.bulkCreate(postData);
// =============================================================

// Export the seedPosts function
// =============================================================
module.exports = seedPosts;
