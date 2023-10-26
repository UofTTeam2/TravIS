// Desc: This file will handle all the put/post/delete routes for the forum.
// Author: Cristiano Barboza Godinho
// A large part of the research for this file was done through the websites W3 Schools (<https://www.w3schools.com/>), MDN Web Docs (<https://developer.mozilla.org/en-US/docs/Web>) and ChatGPT (<https://chat.openai.com/>), and as such small sections of code were adapted from examples offered in those sites.
// =============================================================

// Dependencies
// =============================================================
const router = require('express').Router();
const multer = require('multer');
const { Post, Comment } = require('../models');
const loginAuth = require('../utils/auth');
// =============================================================

// // Setting up folder to receive and format uploads via multer
// =============================================================
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
// =============================================================
// Second Optin for multer
// const storage = multer.diskStorage({
//     destination: './public/images/userdata/',
//     filename: function (req, file, cb) {
//         const fileSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const fileName = file.fieldname + '-' + fileSuffix;
//         file.originalname = fileName;
//         cb(null, fileName);
//     },
// });
// const uploadFolder = multer({ storage: storage });
// =============================================================

// POST route for a new topic
// =============================================================
router.post(
    '/post',
    loginAuth,
    upload.single('forum-user-image'),
    async (req, res) => {
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
    }
);
// =============================================================

// POST route for a new comment
// =============================================================
router.post(
    '/comment',
    loginAuth,
    upload.single('forum-user-image'),
    async (req, res) => {
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
    }
);
// =============================================================

// Export the router
// =============================================================
module.exports = router;
