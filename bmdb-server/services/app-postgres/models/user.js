'use strict';

const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Username is required' },
        notEmpty: { msg: 'Username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email already exists' },
      validate: {
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Email format is invalid' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password is required' },
        len: {
          args: [5],
          msg: 'Password must be at least 5 characters'
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, 10);
  });
  return User;
};