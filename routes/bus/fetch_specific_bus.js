const db = require("../../db");
const express = require("express");
const router = express.Router();

const conn = db.connection;

router.get("/api/buses/:id", (req, res) => {
  //bus info will be id, bus_name, bus_number, bus_fare, bus_type, total_seats, departs_from, arrives_to, driver_id,

  //this will be used for the user side after loggin in based on the location they select a specific bus. We use the client side framework to fetch the id of selected bus and then pass it to the next page of specific bus info.

  const id = req.params.id;
  console.log(req.params.id);
  conn.query("SELECT * FROM buses WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
