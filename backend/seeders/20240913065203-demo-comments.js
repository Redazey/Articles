'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
        {
          text: 'Комментарий 1 к статье 1',
          article_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          text: 'Комментарий 2 к статье 1',
          article_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          text: 'Комментарий 1 к статье 2',
          article_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
