'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.sale);
      // define association here
    }
  };
  Apt.init({
    name: DataTypes.STRING,
    deposit: DataTypes.INTEGER,
    monthly_rent: DataTypes.INTEGER,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    subway: DataTypes.BOOLEAN,
    convenience_store: DataTypes.BOOLEAN,
    restaurant: DataTypes.BOOLEAN,
    cultural_facility: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    bjd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Apt',
  });
  return Apt;
};