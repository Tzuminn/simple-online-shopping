'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const paymentTypeArr = ['貨到付款', '超商取貨付款', '刷卡']

    await queryInterface.bulkInsert('Payments',
      Array.from({ length: 3 }).map((d, i) => ({
        type: paymentTypeArr[Math.floor(i)],
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {})
  }
}
