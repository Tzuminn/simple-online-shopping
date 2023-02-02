'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'is_on_shelves', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'Category_id')
  }
}
