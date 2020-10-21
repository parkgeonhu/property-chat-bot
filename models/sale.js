'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Apt, {
        foreignKey: "aptId"
      })
    }
  };
  Sale.init({
    aptId: DataTypes.INTEGER,
    deal_type : DataTypes.STRING,
    deposit: DataTypes.INTEGER,
    monthly_rent: DataTypes.INTEGER,
    bjd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};