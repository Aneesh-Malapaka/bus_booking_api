const db = require("../../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const conn = db.connection;

router.get("/admin/buses", (req, res) => {
  //bus info will be id, bus_name, bus_number, bus_fare, bus_type, total_seats, departs_from, arrives_to, driver_id,

  const admin_company = req.session.admin.companyName;

  conn.query(
    "SELECT * FROM buses WHERE belongs_to =?",
    [admin_company],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
