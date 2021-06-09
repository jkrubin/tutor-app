'use strict';

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if(!user.changed('password')) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    resetToken: DataTypes.STRING(4096),
    verified: DataTypes.BOOLEAN,
  }, {
  	hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  users.associate = function(models) {
  };
  users.prototype.comparePassword = function (enteredPass) {
    return bcrypt.compareAsync(enteredPass, this.password)
  }
  return users;
};