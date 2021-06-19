'use strict';
const {tryStringify} = require('../helpers')
function stringifyAttachment(attachment, options){
  attachment.setDataValue('metaData', tryStringify(attachment.metaData))
}
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attachment.belongsTo(models.Lesson)
    }
  };
  Attachment.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    data: DataTypes.STRING.BINARY,
    metaData: DataTypes.STRING,
    isFree: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Attachment',
  });
  Attachment.addHook('beforeValidate', stringifyAttachment)
  return Attachment;
};