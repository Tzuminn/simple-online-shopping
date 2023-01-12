'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Blog.init({
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    isTop: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'Blogs',
    underscored: true
  })
  return Blog
}
