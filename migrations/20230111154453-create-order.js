// npx sequelize model:generate --name Order --attributes orderNumber:string,purchaserName:string,purchaserPhone:string,purchaserEmail:string,receiverName:string,receiverPhone:string,receiverAddress:string,comment:string,totalAmount:integer --underscored
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_number: { // 修改為snake_case
        type: Sequelize.STRING
      },
      purchaser_name: {
        type: Sequelize.STRING
      },
      purchaser_phone: {
        type: Sequelize.STRING
      },
      purchaser_email: {
        type: Sequelize.STRING
      },
      receiver_name: {
        type: Sequelize.STRING
      },
      receiver_phone: {
        type: Sequelize.STRING
      },
      receiver_address: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders')
  }
}
