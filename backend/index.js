// Import required packages
const express = require('express'); // Web framework for creating APIs
const cors = require('cors'); // Middleware to allow cross-origin requests
const { Pool } = require('pg'); // PostgreSQL client for Node.js

// Create an Express app instance
const app = express();
app.use(cors()); // Enable CORS so frontend apps from other domains can call this API
app.use(express.json()); // Parse incoming JSON request bodies

// Create a PostgreSQL connection pool
const pool = new Pool({
    // Values come from environment variables, with defaults for local development
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'notes',
    port: process.env.DB_PORT || 5432
});

// Health check endpoint (used to verify that the API is running)
app.get('/health', (req, res) => res.send('OK'));

// GET /notes (fetch all notes from the database)
app.get('/notes', async (req, res) => {
    const result = await pool.query('SELECT * FROM notes'); // Run SQL query
    res.json(result.rows); // Send query results as JSON
});

// POST /notes (insert a new note into the database)
app.post('/notes', async (req, res) => {
    const { text } = req.body; // Extract "text" field from request body
    await pool.query('INSERT INTO notes (text) VALUES ($1)', [text]); // Parameterized query to prevent SQL injection
    res.sendStatus(201); // Respond with HTTP 201 Created
});

// Start the API server on port 3001
app.listen(3001, () => console.log('Backend running on 3001'));