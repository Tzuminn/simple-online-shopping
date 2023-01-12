// npx sequelize migration:generate --name add-delivery-id-to-order
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'Delivery_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Deliveries',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'Delivery_id')
  }
}
