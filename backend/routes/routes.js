const express = require('express');
const {
    createArticle,
    updateArticle,
    getArticleById,
    getAllArticles,
    deleteArticle
} = require('../controllers/articleController.js');

const {
    createComment,
    updateComment,
    getCommentById,
    getAllComments,
    deleteComment
} = require('../controllers/commentController.js');

const router = express.Router();

// Articles
router.post('/article', createArticle);
router.get('/article/:id', getArticleById);
router.get('/articles', getAllArticles);
router.put('/article/:id', updateArticle);
router.delete('/article/:id', deleteArticle);

// Comments
router.post('/article/:id/comment', createComment);
router.get('/article/:id/comment/:id', getCommentById);
router.get('/article/:id/comments', getAllComments);
router.put('/article/:id/comment/:id', updateComment);
router.delete('/article/:id/comment/:id', deleteComment);

module.exports = router;