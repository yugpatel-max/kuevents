const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { user_id, event_id } = req.body;

  db.query(
    "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)",
    [user_id, event_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Registered Successfully ✅");
    }
  );
});

module.exports = router;