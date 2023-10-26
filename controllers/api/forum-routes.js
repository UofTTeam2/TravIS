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
const { Post } = require('../../models');
const { Comment } = require('../../models');

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

module.exports = router;