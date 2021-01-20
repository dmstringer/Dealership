"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS pgcrypto;"
    );
  },

  down: (queryInterface, Sequelize) => {},
};
