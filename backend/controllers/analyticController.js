const { Comment } = require('../models');
const { Sequelize } = require('sequelize');

// Создание статьи
exports.commentsFromPeriod = async (req, res) => {

    const { dateFrom, dateTo } = req.query;

    if (!dateFrom || !dateTo) {
        return res.status(400).json({ error: 'Both dateFrom and dateTo are required.' });
    }

    try {
        const parsedDateFrom = new Date(dateFrom);
        const parsedDateTo = new Date(dateTo);
    
        if (isNaN(parsedDateFrom) || isNaN(parsedDateTo)) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DDTHH:mm:ss.' });
        }
    
        const articlesWithComments = await Comment.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.between]: [parsedDateFrom, parsedDateTo]
                },
                articleId: req.params.id
            },
            order: [['createdAt', 'ASC']]
        });
    
        return res.json(articlesWithComments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};