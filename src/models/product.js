// import { Sequelize, Model, DataTypes } from 'sequelize';

'use strict';
const {  Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
    },
    category: {
      type:DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    imgURL:{ 
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};