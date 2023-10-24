const { User } = require('../models');

const userdata = [
  {
    username: 'sheist',
    email: 'gregorymaclean@terra.com.br',
    password: 'icheatatgames',
    location: 'Scarborough, Canada'
  },
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'doe123',
    location: 'New York, USA'
  },
  {
    username: 'user123',
    email: 'user123@gmail.com',
    password: 'securepass',
    location: 'Los Angeles, USA'
  },
  {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'test123',
    location: 'London, UK'
  },
  {
    username: 'coolcat',
    email: 'coolcat@email.com',
    password: 'meow123',
    location: 'Paris, France'
  },
  {
    username: 'codinggeek',
    email: 'codinggeek@example.com',
    password: 'code123',
    location: 'Berlin, Germany'
  },
  {
    username: 'sunnyday',
    email: 'sunnyday@email.com',
    password: 'sunshine1',
    location: 'Sydney, Australia'
  },
  {
    username: 'gamer123',
    email: 'gamer123@example.com',
    password: 'gamerpass',
    location: 'Tokyo, Japan'
  },
  {
    username: 'beachlover',
    email: 'beachlover@email.com',
    password: 'beachbum',
    location: 'Cancun, Mexico'
  },
  {
    username: 'smoothmoves',
    email: 'musicfan@example.com',
    password: 'musicrocks',
    location: 'Mississauga, Canada'
  },
  {
    username: 'bookworm',
    email: 'bookworm@example.com',
    password: 'readmore',
    location: 'New Delhi, India'
  },
  {
    username: 'fitnessguru',
    email: 'fitnessguru@example.com',
    password: 'getfitnow',
    location: 'Los Angeles, USA'
  },
  {
    username: 'helebarboza',
    email: 'foodie123@example.com',
    password: 'yumyum',
    location: 'Porto Alegre, Brazil'
  },
  {
    username: 'travelbug',
    email: 'travelbug@example.com',
    password: 'wanderlust',
    location: 'Rio de Janeiro, Brazil'
  },
  {
    username: 'techwizard',
    email: 'techwizard@example.com',
    password: 'tech123',
    location: 'San Francisco, USA'
  },
  {
    username: 'naturelover',
    email: 'naturelover@example.com',
    password: 'outdoors1',
    location: 'Vancouver, Canada'
  },
  {
    username: 'artisticmind',
    email: 'artisticmind@example.com',
    password: 'createart',
    location: 'Florence, Italy'
  },
  {
    username: 'fashionista',
    email: 'fashionista@example.com',
    password: 'stylequeen',
    location: 'New York, USA'
  },
  {
    username: 'landa_panda',
    email: 'golfpro@example.com',
    password: 'holeinone',
    location: 'Scarborough, Canada'
  },
  {
    username: 'sportsfan',
    email: 'sportsfan@example.com',
    password: 'teamspirit',
    location: 'Los Angeles, USA'
  },
  {
    username: 'petlover',
    email: 'petlover@example.com',
    password: 'pawprints',
    location: 'Sydney, Australia'
  },
  {
    username: 'moviebuff',
    email: 'moviebuff@example.com',
    password: 'cinemalover',
    location: 'Hollywood, USA'
  },
  {
    username: 'coffeelover',
    email: 'coffeelover@example.com',
    password: 'java123',
    location: 'Seattle, USA'
  },
  {
    username: 'musiclover',
    email: 'musiclover@example.com',
    password: 'melodies',
    location: 'Austin, USA'
  },
  {
    username: 'hikingenthusiast',
    email: 'hiker@example.com',
    password: 'exploretrails',
    location: 'Denver, USA'
  },
  {
    username: 'techenthusiast',
    email: 'techenthusiast@example.com',
    password: 'geektech',
    location: 'San Jose, USA'
  },
  {
    username: 'yogapractitioner',
    email: 'yoga@example.com',
    password: 'om123',
    location: 'Bali, Indonesia'
  },
  {
    username: 'gardener',
    email: 'gardener@example.com',
    password: 'greenthumb',
    location: 'Portland, USA'
  },
  {
    username: 'cyclingenthusiast',
    email: 'cycler@example.com',
    password: 'pedalpower',
    location: 'Amsterdam, Netherlands'
  },
  {
    username: 'kristbg',
    email: 'kristbg@yahoo.com',
    password: 'Placeholder2023!',
    location: 'Mississauga, Canada'
  }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;