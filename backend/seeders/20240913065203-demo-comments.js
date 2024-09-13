'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
        {
            content: 'комментарий 1 к статье 1',
            articleId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            content: 'комментарий 1 к статье 2',
            articleId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            content: 'комментарий 1 к статье 3',
            articleId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            content: 'комментарий 2 к статье 1',
            articleId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
