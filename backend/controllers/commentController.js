const {articles, comments} = requre('../models');

// Создание комментария
exports.createComment = async (req, res) => {
    try {
        const article = await articles.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        const comment = await comments.create({
            content: req.body.content,
            articleId: req.params.id
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
// Получение комментария по ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await comments.findOne({
            where: {
                id: req.params.commentId,
                articleId: req.params.id
            }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(202).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Получение всех комментариев для статьи
exports.getAllComments = async (req, res) => {
    try {
        const comments = await comments.findAll({
            where: {
                articleId: req.params.id
            }
        });

        res.status(203).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Обновление комментария
exports.updateComment = async (req, res) => {
    try {
        const comment = await comments.findOne({
            where: {
                id: req.params.commentId,
                articleId: req.params.id
            }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await comment.update(req.body);

        res.status(204).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Удаление комментария
exports.deleteComment = async (req, res) => {
    try {
        const comment = await comments.findOne({
            where: {
                id: req.params.commentId,
                articleId: req.params.id
            }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.destroy()

        res.status(205);
    } catch (error) {
        return res.status(500).json(message.error);
    }
}