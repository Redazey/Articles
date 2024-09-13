const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // Пусть к конфигурационному файлу

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        pool: config.development.pool,
    }
);

// Импорт моделей
const Article = require('./articles')(sequelize, DataTypes);
const Comment = require('./comments')(sequelize, DataTypes);

Article.hasMany(Comment, {
    onUpdate: 'CASCADE',
});
Comment.belongsTo(Article, { foreignKey: 'articleId' });

// Экспортируем модели и sequelize
module.exports = {
    sequelize,
    Article,
    Comment
};