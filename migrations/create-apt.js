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
      deal_type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
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
      school: {
        type: Sequelize.BOOLEAN
      },
      restaurant: {
        type: Sequelize.BOOLEAN
      },
      cultural_facility: {
        type: Sequelize.BOOLEAN
      },
      traditional_market: {
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