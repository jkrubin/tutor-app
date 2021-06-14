'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseLesson.hasOne(models.Lesson)
      PurchaseLesson.hasOne(models.Purchase)
      PurchaseLesson.belongsTo(models.users)
    }
  };
  PurchaseLesson.init({
    config: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PurchaseLesson',
  });
  return PurchaseLesson;
};