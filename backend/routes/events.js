const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all events
router.get("/", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

module.exports = router;