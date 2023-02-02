'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Product.hasMany(models.OrderDetail, { foreignKey: 'ProductId' })
      Product.hasMany(models.Like, { foreignKey: 'ProductId' })
      Product.hasMany(models.Image, { foreignKey: 'ProductId' })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    isOnShelves: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  return Product
}
