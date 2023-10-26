// Desc: This file is used to seed the User table in the database
// =============================================================

// Importing the User model
// =============================================================
const { User } = require('../models');
// =============================================================

// Creating the User seeds
// =============================================================
const userData = [
    {
        username: 'sheist',
        email: 'gregorymaclean@terra.com.br',
        password: 'icheatatgames',
    },
    {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'doe123',
    },
    {
        username: 'user123',
        email: 'user123@gmail.com',
        password: 'securepass',
    },
    {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'test123',
    },
    {
        username: 'coolcat',
        email: 'coolcat@email.com',
        password: 'meow123',
    },
    {
        username: 'codinggeek',
        email: 'codinggeek@example.com',
        password: 'code123',
    },
    {
        username: 'sunnyday',
        email: 'sunnyday@email.com',
        password: 'sunshine1',
    },
    {
        username: 'gamer123',
        email: 'gamer123@example.com',
        password: 'gamerpass',
    },
    {
        username: 'beachlover',
        email: 'beachlover@email.com',
        password: 'beachbum',
    },
    {
        username: 'smoothmoves',
        email: 'musicfan@example.com',
        password: 'musicrocks',
    },
    {
        username: 'bookworm',
        email: 'bookworm@example.com',
        password: 'readmore',
    },
    {
        username: 'fitnessguru',
        email: 'fitnessguru@example.com',
        password: 'getfitnow',
    },
    {
        username: 'helebarboza',
        email: 'foodie123@example.com',
        password: 'yumyum',
    },
    {
        username: 'travelbug',
        email: 'travelbug@example.com',
        password: 'wanderlust',
    },
    {
        username: 'techwizard',
        email: 'techwizard@example.com',
        password: 'tech123',
    },
    {
        username: 'naturelover',
        email: 'naturelover@example.com',
        password: 'outdoors1',
    },
    {
        username: 'artisticmind',
        email: 'artisticmind@example.com',
        password: 'createart',
    },
    {
        username: 'fashionista',
        email: 'fashionista@example.com',
        password: 'stylequeen',
    },
    {
        username: 'landa_panda',
        email: 'golfpro@example.com',
        password: 'holeinone',
    },
    {
        username: 'sportsfan',
        email: 'sportsfan@example.com',
        password: 'teamspirit',
    },
    {
        username: 'petlover',
        email: 'petlover@example.com',
        password: 'pawprints',
    },
    {
        username: 'moviebuff',
        email: 'moviebuff@example.com',
        password: 'cinemalover',
    },
    {
        username: 'coffeelover',
        email: 'coffeelover@example.com',
        password: 'java123',
    },
    {
        username: 'musiclover',
        email: 'musiclover@example.com',
        password: 'melodies',
    },
    {
        username: 'hikingenthusiast',
        email: 'hiker@example.com',
        password: 'exploretrails',
    },
    {
        username: 'techenthusiast',
        email: 'techenthusiast@example.com',
        password: 'geektech',
    },
    {
        username: 'yogapractitioner',
        email: 'yoga@example.com',
        password: 'om123',
    },
    {
        username: 'gardener',
        email: 'gardener@example.com',
        password: 'greenthumb',
    },
    {
        username: 'cyclingenthusiast',
        email: 'cycler@example.com',
        password: 'pedalpower',
    },
    {
        username: 'kristbg',
        email: 'kristbg@yahoo.com',
        password: 'Placeholder2023!',
    },
];
// =============================================================

// Creating and exporting the User seeds
// =============================================================
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });
// =============================================================
module.exports = seedUsers;
