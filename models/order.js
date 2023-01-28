'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Order.hasMany(models.OrderDetail, { foreignKey: 'OrderId' })
      Order.belongsTo(models.Payment, { foreignKey: 'PaymentId' })
      Order.belongsTo(models.Delivery, { foreignKey: 'DeliveryId' })
      Order.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Order.init({
    orderNumber: DataTypes.STRING,
    purchaserName: DataTypes.STRING,
    purchaserPhone: DataTypes.STRING,
    purchaserEmail: DataTypes.STRING,
    receiverName: DataTypes.STRING,
    receiverPhone: DataTypes.STRING,
    receiverAddress: DataTypes.STRING,
    comment: DataTypes.STRING,
    totalAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  })
  return Order
}
