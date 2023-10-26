const { Topic } = require('../models');

const topicdata = [
  {
    title: 'Hello Stranger',
    description: 'Introduce yourself and get to know who is part of the TravIS community.',
    iconalt: 'A drawing of a waving hand'
  },
  {
    title: 'I Know a Place',
    description: 'Tips and little-known facts and options to make your journey all the more special.',
    iconalt: 'A drawing of a map'
  },
  {
    title: 'Welcome to My Humble Abode',
    description: 'Be a local guide for fellow travellers, or find one for your next trip.',
    iconalt: 'A drawing of a fireplace'
  },
  {
    title: 'Enjoy the View',
    description: 'Share photos and stories from your travels.',
    iconalt: 'A drawing of a postcard'
  },
  {
    title: 'Practically for Free',
    description: 'Know of a deal other travellers could make use of? Let us know here.',
    iconalt: 'A drawing of a fanny pack'
  },
  {
    title: "There's a Shortcut",
    description: 'Got any ideas for new features TravIs could offer? Let your suggestions be known.',
    iconalt: 'A drawing of a light bulb'
  }
];

const seedTopic = () => Topic.bulkCreate(topicdata);

module.exports = seedTopic;
