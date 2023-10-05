"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const taskTable = await queryInterface.describeTable("tasks");

    if (!taskTable["created_at"]) {
      await queryInterface.addColumn("tasks", "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
    }

    if (!taskTable["updated_at"]) {
      await queryInterface.addColumn("tasks", "updated_at", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
    }

    if (!taskTable["deleted_at"]) {
      await queryInterface.addColumn("tasks", "deleted_at", {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tasks", "created_at");
    await queryInterface.removeColumn("tasks", "updated_at");
    await queryInterface.removeColumn("tasks", "deleted_at");
  },
};
