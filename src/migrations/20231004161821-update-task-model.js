"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Tasks", "id", {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Tasks", "id", {
      type: Sequelize.UUID,
      primaryKey: false,
      defaultValue: null,
    });
  },
};
