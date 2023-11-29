const db = require("../../db");
const express = require("express");
const router = express.Router();

const conn = db.connection;

router.get("/api/buses", (req, res) => {
  //bus info will be id, bus_name, bus_number, bus_fare, bus_type, total_seats, departs_from, arrives_to, driver_id,
  //this will be used for the user side after loggin in based on the location they select

  const { from, to } = req.body;

  conn.query(
    "SELECT * FROM buses WHERE departs_from =? AND arrives_to =?",
    [from, to],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
