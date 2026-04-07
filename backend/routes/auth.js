const express = require("express");
const router = express.Router();
const db = require("../db");

// Register user
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Registered ✅");
    }
  );
});

// Login user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.status(401).send("Invalid credentials ❌");
      }
    }
  );
});

module.exports = router;