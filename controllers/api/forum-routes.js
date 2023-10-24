const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({
  dest: 'public/images/userdata/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});
const { User } = require('../../models');
const { Topic } = require('../../models');
const { Post } = require('../../models');
const { Comment } = require('../../models');

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

router.post('/post', upload.single('forum-user-image'), async (req, res) => {
  try {
    const dbPost = await Post.create({
      subject: req.body.postsubject,
      user_id: req.session.user_id,
      topic_id: req.session.topic_id,
    });
    const dbComment = await Comment.create({
      text: req.body.posttext,
      timestamp: Date.now(),
      user_id: req.session.user_id,
      post_id: dbPost.id,
    });
    if (req.file) {
      const extname = path.extname(req.file.originalname);
      const newFilename = `comment-${dbComment.id}${extname}`;
      const newPath = path.join(req.file.destination, newFilename);
      fs.rename(req.file.path, newPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        res.status(200);
        res.redirect(`/api/forum/post/${dbPost.id}`);
      });
    } else {
      res.status(200);
      res.redirect(`/api/forum/post/${dbPost.id}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/comment', upload.single('forum-user-image'), async (req, res) => {
  try {
    const dbComment = await Comment.create({
      text: req.body.posttext,
      timestamp: Date.now(),
      user_id: req.session.user_id,
      post_id: req.session.post_id,
    });
    if (req.file) {
      const extname = path.extname(req.file.originalname);
      const newFilename = `comment-${dbComment.id}${extname}`;
      const newPath = path.join(req.file.destination, newFilename);
      fs.rename(req.file.path, newPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        res.status(200);
        res.redirect(`/api/forum/post/${req.session.post_id}`);
      });
    } else {
      res.status(200);
      res.redirect(`/api/forum/post/${req.session.post_id}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Start of Fake Login/Logout Code ** TO BE DELETED **
router.post('/fakelogin', async (req, res) => {
  console.info("req.session.loggedIn = " + req.session.loggedIn);
  if (!req.session.loggedIn) {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: 'kristbg',
      },
    });
    console.info("Logged in as kristbg!");
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      res
        .status(204)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(204).json(err);
  }
} else {
  console.info("You are already logged in!");
}
});

router.post('/fakelogout', (req, res) => {
  console.info("req.session.loggedIn = " + req.session.loggedIn);
  if (req.session.loggedIn) {
    console.info("User kristbg logged out!");
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.info("You are not logged in!");
    res.status(204).end();
  }
});
// End of Fake Login/Logout Code

// Start of Likes Check
router.get('/likelist', async (req, res) => {
  try {
    const dbLikes = await Likes.findAll({
      where: {
        comment_id: 25,
      },
    });

    const likes = dbLikes.map((like) =>
    like.get({ plain: true })
  );

    console.info(likes);

    res.status(200).json({ likes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
);
// End of Likes Check

// Start of Dashboard Demo
router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// End of Dashboard Demo

module.exports = router;