const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pen_e-commerce",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: Try again", err);
    return;
  }
  console.log("Connected to MySQL,Have FUN...");
});

// Middleware to parse JSON
app.use(bodyParser.json());

app.get("/user", (req, res) => {
  connection.query("SELECT * FROM users", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, email_id, password } = req.body;
  if (!username && !email_id && !password)
    return res.status("Please fill the fields");
  const sql =
    "INSERT INTO users (username, email_id, password) VALUES (?, ?, ?)";

  db.query(sql, [username, email_id, password], (err, result) => {
    if (err) {
      console.error("Registration failed", err);
      res.status(500).json({ message: "Registration failed" });
      return;
    }

    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { usernameOremail_id, password } = req.body;
  const sql =
    "SELECT * FROM users WHERE (username = ? OR email_id = ? )AND password = ?";

  db.query(
    sql,
    [usernameOremail_id, usernameOremail_id, password],
    (err, result) => {
      if (err) {
        console.error("Login failed", err);
        res.status(500).json({ message: "Login failed" });
        return;
      }

      if (result.length > 0) {
        console.log("Login successful");
        res
          .status(200)
          .json({ message: "Login successful", username: result[0].username });
      } else {
        console.error("Invalid credentials");
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

// ... (Start server)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
