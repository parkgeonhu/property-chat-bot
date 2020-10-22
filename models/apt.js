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
      this.hasMany(models.Sale);
      // define association here
    }
  };
  Apt.init({
    name: DataTypes.STRING,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    build_year : DataTypes.INTEGER,
    new_building : DataTypes.INTEGER,
    mart : DataTypes.BOOLEAN,
    school : DataTypes.BOOLEAN,
    subway: DataTypes.BOOLEAN,
    convenience_store: DataTypes.BOOLEAN,
    restaurant: DataTypes.BOOLEAN,
    cultural_facility: DataTypes.BOOLEAN,
    traditional_market: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    bjd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Apt',
  });
  return Apt;
};