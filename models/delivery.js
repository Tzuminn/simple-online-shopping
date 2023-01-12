'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Delivery.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Delivery',
    tableName: 'Deliveries',
    underscored: true
  })
  return Delivery
}
