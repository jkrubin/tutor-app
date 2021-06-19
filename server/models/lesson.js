'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.users)
      Lesson.belongsToMany(models.Purchase, {through:models.PurchaseLesson})
      Lesson.hasMany(models.Attachment)
    }
  };
  Lesson.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    data: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};