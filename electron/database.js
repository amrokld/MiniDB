require("dotenv").config();

const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Database connected!");

        const schemaPath = path.join(__dirname, "..", "database", "schema.sql");
        const schema = fs.readFileSync(schemaPath, "utf8");

        await client.query(schema);

        console.log("Schema initialized");

    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = {
    client,
    connectDatabase,
};