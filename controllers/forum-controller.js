// Desc: This file will handle all the get routes for the forum.
// Author: Cristiano Barboza Godinho
// =============================================================

// Dependencies
// =============================================================
const router = require('express').Router();
const { Topic, Post, User, Comment } = require('../models');
const loginAuth = require('../utils/auth');
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

        res.render('forum', {
            topics,
            logged_in: req.session.logged_in,
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

        const topic = topicData.get({ plain: true });
        req.session.topic_id = topic.id;
        res.render('topic', {
            topic,
            logged_in: req.session.logged_in,
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
            logged_in: req.session.logged_in,
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
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================
