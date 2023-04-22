const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// enable CORS
app.use(cors());

// parse JSON request body
app.use(express.json());

// create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'mydatabase',
});

// generate a JWT token
function generateToken(user) {
  return jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

// login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // query the database for the user with the specified username
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    console.log([username]);
    // check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // check if password is correct
    const match = await bcrypt.compare(password, rows[0].password);
    const pass = await bcrypt.hash(password);
    console.log({pass});
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // generate a JWT token and send it back to the client
    const token = generateToken(rows[0]);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
