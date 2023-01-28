'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Order, { foreignKey: 'UserId' })
      User.hasMany(models.Like, { foreignKey: 'UserId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN // 新增這句
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // 新增這句
    underscored: true
  })
  return User
}
