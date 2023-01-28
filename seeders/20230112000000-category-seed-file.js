'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categoriesArr = ['dog', 'cat']
    await queryInterface.bulkInsert('Categories',
      Array.from({ length: 2 }).map((d, i) => ({
        name: categoriesArr[i],
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
