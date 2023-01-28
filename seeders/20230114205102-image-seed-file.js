'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM Products;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Images',
      Array.from({ length: 120 }).map((d, i) => ({
        url: `https://loremflickr.com/600/600/kitten/?lock=${i}`,
        is_cover: (i % 6 === 0) === true,
        created_at: new Date(),
        updated_at: new Date(),
        product_id: products[Math.floor(i / 6)].id
      })), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {})
  }
}
