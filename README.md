# Node.js TypeScript TypeORM PostgreSQL Project

This project is a feeds fetch of a Node.js application using TypeScript, TypeORM for database operations, and PostgreSQL as the database.

## Features
- Feed fetch and store
- Feed list show
- Feed filter by title & description
- Background task for feeds fetch

## Requirements

Ensure you have the following software installed on your machine:

- Node.js
- Express
- npm (Node Package Manager)
- TypeScript
- TypeORM
- PostgreSQL

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mkawsar/news-aggregator.git
   cd news-aggregator
   ```
2. Install the project dependency
    ```bash
    npm install
    ```
## Configuration
1. Database Configuration: Edit the ormconfig.json file to set up your PostgreSQL connection settings.
    ```json
    {
        "type": "postgres",
        "host": "******",
        "port": 5432,
        "username": "******",
        "password": "******",
        "database": "******",
        "entities": ["./src/entity/*.ts"],
        "migrations": ["./src/migration/*.ts"],
        "cli": {
            "entitiesDir": "./src/entity",
            "migrationsDir": "./src/migration"
        }
    }
    ```

2. Environment Variables: If applicable, set environment variables such as `DATABASE_URL` to customize database connections.

3. Create environment file and setup databas and change to dev to prod mode.
    ```bash
    cp .env.example .env
    ```

## Usage
1. Generate database migration file from Entity file
    ```bash
        npm run migration:generate {EntityName}
    ```
    > [!NOTE]  
    > If you create a new entity

2. Migration the database files
    ```bash
    npm run migration:run
    ```
3. Compile TypeScript: Compile the TypeScript code to JavaScript.
    ```bash
    npm run build
    ```
4. Start the Application: Run the compiled JavaScript code.
    ```bash
    npm run start:dev
    ```
5. News feeds fetching using background task
    ```bash
    npm run feed:fetch
    ```
6. API Endpoints: Once the server is running, you can access with this endpoints:
    * POST `/api/v1/article/fetch` - Retrieves all articles from the database.
    * GET `/api/v1/article/list` - Adds a job to the queue to fetch and save articles from RSS feeds.
7. Error Handling
    * All errors are logged and a 500 status code with a JSON error message is returned.
8. Background Tasks
    * Background tasks are managed using Bull and executed every 15 minutes.
9. TypeORM Configuration
    * Database connection and entity management are handled using TypeORM.
10. Postman documentation
    * [https://documenter.getpostman.com/view/437214/2sA3dviBxc](https://documenter.getpostman.com/view/437214/2sA3dviBxc)

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/foo-bar`).
3. Make your changes.
4. Commit your changes (git commit -am `Add some feature`).
5. Push to the branch (`git push origin feature/foo-bar`).
6. Create a new Pull Request.

