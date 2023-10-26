// Desc: This file is Used to seed the comment table in the database. Also class methods for likes and dislikes
// Author: Cristiano Barboza Godinho
// =============================================================

// Importing the Comment model
// =============================================================
const { Comment } = require('../models');
// =============================================================

// Creating the Comment seeds
// =============================================================
const loremIpsumStrings = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Pellentesque nec mauris sit amet ex euismod venenatis.',
    'Suspendisse dictum lectus id ipsum dictum, et hendrerit urna iaculis.',
    'Fusce nec turpis sit amet ligula laoreet ultricies.',
    'Cras facilisis tortor id justo eleifend vestibulum.',
    'Nulla ut ante sit amet ligula elementum auctor.',
    'Donec accumsan justo id libero iaculis, sed efficitur nulla vestibulum.',
    'Praesent sagittis augue ut diam aliquam, a eleifend est tincidunt.',
    'Vivamus et quam et urna tincidunt vulputate nec ac justo.',
    'Proin ullamcorper ipsum in sapien bibendum, in condimentum neque interdum.',
    'Praesent in congue lacus. Vestibulum id nisl vel leo luctus accumsan at ac mi. Nullam cursus eleifend arcu, interdum pharetra velit tempus vitae. Suspendisse nec libero ligula. Sed in elit rutrum, laoreet tortor eu, gravida dolor. Sed ut ornare erat. Cras vel egestas risus, vitae aliquet orci. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    'Integer maximus lectus urna, faucibus blandit dui tincidunt a. Ut tincidunt dui et leo tincidunt, lacinia efficitur augue posuere. Nullam ultrices, libero vel tristique suscipit, risus dui faucibus lectus, vitae sollicitudin risus est quis odio. Praesent id molestie eros. Vestibulum sit amet blandit orci, ac fringilla turpis. Maecenas accumsan condimentum scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    'Proin at maximus mi. Suspendisse potenti. Donec sit amet magna vel massa laoreet ultrices vitae quis lorem. Aliquam euismod auctor fermentum. Suspendisse ac tincidunt tortor. Nam et vestibulum ante, nec bibendum arcu. Morbi efficitur elementum quam ac fermentum. Ut et massa odio.',
    'Maecenas auctor efficitur augue ut faucibus. Donec tincidunt, odio quis auctor ullamcorper, risus turpis consequat nibh.',
    'Nullam ut nisl ac sapien dignissim imperdiet.',
    'Mauris finibus ligula et nunc bibendum, suscipit placerat nunc accumsan. Suspendisse eget sagittis ante. Nam semper luctus augue, ac feugiat leo ultricies eget. Aenean pellentesque elit id dui vehicula, ut bibendum nisi vulputate. Duis commodo fringilla pharetra. Pellentesque mi est, interdum nec elementum id, sodales ac mauris. Curabitur a consectetur turpis. Praesent eu nisi justo. Morbi ullamcorper finibus pharetra. Duis interdum tortor in cursus finibus. Donec ut tempor nisl. Etiam blandit eros eget dui facilisis finibus. Nullam egestas, lectus non gravida sodales, nunc mauris ornare felis, eget ultricies mauris massa in purus. Aliquam at pharetra quam. Nullam viverra nec mauris eget lacinia.',
    'Nunc euismod!',
    'Pellentesque tincidunt quam sed mi vestibulum, sed pellentesque turpis euismod.',
    'Cras volutpat metus vel nisl bibendum, id gravida eros lacinia.',
    'Suspendisse placerat purus nec erat mattis, vel aliquet mi congue.',
];

const generateRandomTimestamp = () => {
    const startTimestamp = new Date('2022-10-22').getTime();
    const endTimestamp = new Date('2023-10-22').getTime();
    const randomTimestamp = new Date(
        startTimestamp + Math.random() * (endTimestamp - startTimestamp)
    );
    return randomTimestamp.toISOString().slice(0, 19).replace('T', ' ');
};

const generateRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const seedComment = async () => {
    // Array to keep track of posts that already have at least one comment
    const postsWithComments = new Set();

    // Generate random comments
    const commentData = [];

    for (let i = 1; i <= 720; i++) {
        const text =
            loremIpsumStrings[
                Math.floor(Math.random() * loremIpsumStrings.length)
            ];
        const timestamp = generateRandomTimestamp();
        const user_id = generateRandomInt(1, 5);
        const post_id = generateRandomInt(1, 99);
        const parent_comment_id = generateRandomInt(1, 720);

        commentData.push({
            text,
            timestamp,
            user_id,
            post_id,
            parent_comment_id,
        });

        // Add the post to the set of posts with comments
        postsWithComments.add(post_id);
    }

    // Ensure that there's at least one comment for each post
    const allPosts = Array.from(Array(99), (_, i) => i + 1);

    for (const post_id of allPosts) {
        if (!postsWithComments.has(post_id)) {
            // Generate a random comment for this post
            const text =
                loremIpsumStrings[
                    Math.floor(Math.random() * loremIpsumStrings.length)
                ];
            const timestamp = generateRandomTimestamp();
            const user_id = generateRandomInt(1, 29);
            const parent_comment_id = generateRandomInt(1, 720);

            commentData.push({
                text,
                timestamp,
                user_id,
                post_id,
                parent_comment_id,
            });
        }
    }

    // Create comments in the database
    await Comment.bulkCreate(commentData);
};
// =============================================================

// Exporting the seedComment function
// =============================================================
module.exports = seedComment;
