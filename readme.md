
# taskApi

## How to run taskApi:

1. **Install PostgreSQL:**

   - Install PostgreSQL in your machine based on your operating system.

2. **Install Dependencies:**

   - Run the following command to install the project dependencies:

   ```bash
   npm install
3.  **Configure Database Connection:**
   
    - Navigate to src > config > config.js and update the database configuration according to your local database.
  
4. **Create Database Table / Run Migration::**

   - still in src directory

   - Run the following command to generate migration file :

     ```bash
     npx sequelize-cli migration:generate --name create_task_table

   - A file will be auto-generated located in src > migrations.
   - Add the provided code inside the generated file:
  
```typescript
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tasks", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tasks");
  },
};
  ```
- Finally, run the migration with the following command:
   ```bash
   npx sequelize-cli db:migrate


5. **Run Application::**

   - To start the application, use the following command:
        ```bash
     npm start

6. **Run Test::**

   - To start the application, use the following command:
        ```bash
     npm test


**NOTE::**

- Please ensure that you generate some data before running the tests.
- If you wish to run the test for the second time and so on, kindly replace the variable validTestId inside taskApi.test.ts every time you run, as the test deletes a task.


   
