const {articles, comments} = requre('../models');

// Создание статьи
exports.createArticle = async (req, res) => {
    try {
        const article = await articles.create(req.body)

        res.status(201).json(article)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Получение статьи по ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await articles.findByPk(req.params.id, {
            include: [comments]
        });

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.status(202).json(article)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Получение всех статей
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articles.findAll();

        res.status(203).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Обновление статьи
  exports.updateArticle = async (req, res) => {
    try {
        const article = await articles.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        await article.update(req.body);

        res.status(203).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Удаление статьи
  exports.deleteArticle = async (req, res) => {
    try {
        const article = await articles.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        await article.destroy();

        res.status(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };