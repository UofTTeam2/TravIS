// const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const { User } = require('../models');
const { Topic } = require('../models');
const { Post } = require('../models');
const { Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbTopic = await Topic.findAll({
      include: [
        Post
      ],
    });
    const topics = dbTopic.map((topic) =>
      topic.get({ plain: true })
    );
    res.render('forum', {
      topics,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/topic/:id', async (req, res) => {
  try {
    const dbTopic = await Topic.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          include: [
            Comment,
            User,
          ],
        },
      ],
      order: [
        [Post, Comment, 'timestamp', 'DESC'],
      ],
    });

    const topic = dbTopic.get({ plain: true });
    req.session.topic_id = topic.id;
    res.render('topic', { topic, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newpost', async (req, res) => {
  try {
    res.render('newpost');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const dbPost = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [
            {
              model: User,
              include: [
                {
                  model: Comment,
                },
              ],
            },
          ],
          order: [['timestamp', 'ASC']],
        },
      ],
      order: [
        [{ model: Comment }, 'timestamp', 'ASC'],
      ],
    });
    const post = dbPost.get({ plain: true });
    req.session.post_id = post.id;
    const commentsWithImages = post.comments.map(comment => {
      const pictureFileName = `comment-${comment.id}`;
      const extensionList = ['jpg', 'jpeg', 'png', 'gif'];
      let imagePath = null;
      for (const extension of extensionList) {
        if (fs.existsSync(`public/images/userdata/${pictureFileName}.${extension}`)) {
          imagePath = `/images/userdata/${pictureFileName}.${extension}`;
          break;
        }
      }
      return {
        comment,
        imagePath,
      };
    });

    res.render('post', { post, commentsWithImages, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;