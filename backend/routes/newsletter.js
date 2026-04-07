const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { email } = req.body;

  db.query(
    "INSERT INTO newsletter (email) VALUES (?)",
    [email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Subscribed ✅");
    }
  );
});

module.exports = router;