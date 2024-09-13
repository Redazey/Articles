'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('articles', [
            {
                title: 'Статья 1',
                text: 'Текст статьи 1',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: 'Статья 2',
                text: 'Текст статьи 2',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('articles', null, {});
    }
};
