# Task Management Api

A brief description of your project.

## Table of Contents

- [Overview](#overview)
- [Why TypeScript?](#why-typescript)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [Installation](#installation)

## Overview

The Task Management API is a RESTful web service that allows users to perform CRUD operations on tasks. It provides endpoints for creating, reading, updating, and deleting tasks.

## Why TypeScript?

TypeScript was chosen for this project to leverage its static typing capabilities. This helps catch potential bugs during development and provides better tooling for code navigation and refactoring.

## Project Structure

The codebase is organized into the following components:

- Controllers (src/controllers): This directory contains the controllers responsible for handling HTTP requests and sending back responses. Each controller is responsible for a specific set of routes or resources.
- Services (src/services): This directory houses the business logic of the application. Services handle tasks like interacting with the database, applying business rules, and returning data to the controllers.
- Models (src/models): This is where i define the data models or schemas that represent your application's data structures
- Routes (src/routes): This directory contains the route definitions that specify which controllers should handle different routes.
- Middleware (src/middleware): This directory contains custom middleware functions for handling errors and request validation.
- Constants (src/const): This directory stores constant values, such as error messages or other configurations.
- Helper:(src/const): Contains utility functions used throughout the application.
- test: Contains unit tests for routes and handler.


## Design Decisions

- Separation of Concerns: The codebase follows the principle of separating concerns, meaning each module (controller, service, model, etc.) has a distinct responsibility.
- Service Layer: Business logic is encapsulated in the service layer. This makes it easier to unit test and allows for reusability across different parts of the application.
- Express.js: The project uses Express.js as the web application framework for handling HTTP requests and responses.
- Sequelize: Sequelize is chosen as the ORM (Object-Relational Mapping) library for interacting with the database. It provides a simple API for performing database operations.
- Error Handling: Custom middleware functions are implemented to handle errors and return appropriate responses to clients.


## Installation


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


   
