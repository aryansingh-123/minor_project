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
  return jwt.sign({ userEmail: user.useremail, userName: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

// login endpoint
app.post('/api/login', async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    // query the database for the user with the specified username
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE useremail = ?',
      [userEmail]
    );
    // check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // check if password is correct
    const match = await bcrypt.compare(password, rows[0].password);
    
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
// registration endpoint
app.post('/api/register', async (req, res) => {
  const { userName, userEmail, password } = req.body;

  try {
    // check if user with the given email already exists
    const [existingUserRows] = await pool.query(
      'SELECT * FROM users WHERE useremail = ?',
      [userEmail]
    );
    if (existingUserRows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert the new user into the database
    const [insertUserResult] = await pool.query(
      'INSERT INTO users (username, useremail, password) VALUES (?, ?, ?)',
      [userName, userEmail, hashedPassword]
    );

    // generate a JWT token and send it back to the client
    const token = generateToken({ userEmail });
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
