'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const deliveryTypeArr = ['一般宅配', '7-11取貨', '全家取貨']

    await queryInterface.bulkInsert('Deliveries',
      Array.from({ length: 3 }).map((d, i) => ({
        type: deliveryTypeArr[Math.floor(i)],
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Deliveries', null, {})
  }
}
