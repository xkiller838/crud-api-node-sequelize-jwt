import bcrypt from "bcrypt";

'use strict';
const {  Model} = require('sequelize');
const role = require('./role');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      User.belongsTo(models.Role,{
         foreignKey: "id",
         target_key: "rol_id"
      })
    }
  }
  User.init({
    firstName:{
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password:{
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',    
 hooks: {
      beforeCreate: (user) => {
        let password = user.password.toString();
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
      }
    },
     /* instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }      */
  });
  
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  /*   const respuesta = bcrypt.compareSync(password, this.password);
    console.log("aqui respuesta"+" "+respuesta); */
  };

/* User.prototype.validPassword = function () {
  console.log("This is an instance method log");
};
 */
  return User;
};

