"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("tasks", "completed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("tasks", "completed", {
      type: Sequelize.STRING, // Change back to STRING if needed
      allowNull: false,
      defaultValue: "previousDefaultValue",
    });
  },
};
