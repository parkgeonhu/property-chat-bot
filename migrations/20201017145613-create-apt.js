'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      deposit: {
        type: Sequelize.INTEGER
      },
      monthly_rent: {
        type: Sequelize.INTEGER
      },
      x: {
        type: Sequelize.FLOAT
      },
      y: {
        type: Sequelize.FLOAT
      },
      subway: {
        type: Sequelize.BOOLEAN
      },
      convenience_store: {
        type: Sequelize.BOOLEAN
      },
      restaurant: {
        type: Sequelize.BOOLEAN
      },
      cultural_facility: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING
      },
      bjd: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Apts');
  }
};