// Desc: This file will handle all the get routes for the forum.
// Author: Cristiano Barboza Godinho
// A large part of the research for this file was done through the websites W3 Schools (<https://www.w3schools.com/>), MDN Web Docs (<https://developer.mozilla.org/en-US/docs/Web>) and ChatGPT (<https://chat.openai.com/>), and as such small sections of code were adapted from examples offered in those sites.
// =============================================================

// Dependencies
// =============================================================
const router = require('express').Router();
const { Topic, Post, User, Comment } = require('../models');
const loginAuth = require('../utils/auth');
const fs = require('fs');
// =============================================================

// GET route for the forum homepage
// =============================================================
router.get('/', async (req, res) => {
    try {
        const topicData = await Topic.findAll({
            include: [
                {
                    model: Post,
                },
            ],
        });

        const topics = topicData.map((topic) => topic.get({ plain: true }));

        console.log(req.session.loggedIn);

        res.render('forum', {
            topics,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================

// GET route for a specific topic
// =============================================================
router.get('/topic/:id', loginAuth, async (req, res) => {
    try {
        const topicData = await Topic.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    include: [
                        {
                            model: Comment,
                            include: [
                                {
                                    model: User,
                                    attributes: ['username'],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [[Post, Comment, 'timestamp', 'DESC']],
        });

        console.log(topicData);

        const topic = topicData.get({ plain: true });
        req.session.topic_id = topic.id;
        res.render('topic', {
            topic,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================

// GET route for a specific post
// =============================================================
router.get('/post/:id', loginAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
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
            order: [[Comment, 'timestamp', 'ASC']],
        });

        const post = postData.get({ plain: true });

        req.session.post_id = post.id;

        const commentsWithImages = post.comments.map((comment) => {
            const pictureFileName = `comment-${comment.id}`;
            const extensionList = ['jpg', 'jpeg', 'png', 'gif'];
            let imagePath = null;
            for (const extension of extensionList) {
                if (
                    fs.existsSync(
                        `public/images/userdata/${pictureFileName}.${extension}`
                    )
                ) {
                    imagePath = `/images/userdata/${pictureFileName}.${extension}`;
                    break;
                }
            }
            return {
                comment,
                imagePath,
            };
        });

        res.render('post', {
            post,
            commentsWithImages,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// =============================================================

// GET route for the create post page
// =============================================================
router.get('/newpost', loginAuth, async (req, res) => {
    try {
        res.render('newpost', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================

// Export routes
// =============================================================
module.exports = router;
