// npx sequelize migration:generate --name add-payment-id-to-order
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'Payment_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Payments',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'Payment_id')
  }
}
