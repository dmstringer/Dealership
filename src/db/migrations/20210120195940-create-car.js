"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      doors: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      automatic: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      isNew: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      miles: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dealershipId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      clientId: {
        type: Sequelize.STRING,
      },
      employeeId: {
        type: Sequelize.STRING,
      },
      sold: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Cars");
  },
};
