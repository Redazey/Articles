'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('articles', [
            {
                title: 'First Article',
                content: 'This is the content of the first article.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Second Article',
                content: 'This is the content of the second article.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Third Article',
                content: 'This is the content of the third article.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('articles', null, {});
    }
};
