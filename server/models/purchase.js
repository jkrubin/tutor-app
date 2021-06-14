'use strict';
const {tryStringify} = require('../helpers')
function stringifyPurchase(purchase, options){
  purchase.setDataValue('lessons', tryStringify(purchase.lessons))
  purchase.setDataValue('config', tryStringify(purchase.config))
  purchase.setDataValue('history', tryStringify(purchase.history))
}
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsTo(models.users)
      Purchase.belongsToMany(models.Lesson, {through: models.PurchaseLesson})
    }
  };
  Purchase.init({
    lessons: DataTypes.TEXT,
    config: DataTypes.TEXT,
    history: DataTypes.TEXT,
    price: DataTypes.STRING,
    status: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Purchase',
  });

  Purchase.addHook('beforeValidate', stringifyPurchase)
  return Purchase;
};