const db = require("../../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const conn = db.connection;

//creating bus table
const createTableBuses = `CREATE TABLE IF NOT EXISTS buses  (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bus_name VARCHAR(255) NOT NULL,
    bus_number INT NOT NULL UNIQUE,
    bus_type VARCHAR(100) NOT NULL,
    bus_fare FLOAT(2) NOT NULL,
    total_seats INT NOT NULL,
    departs_from VARCHAR(255) NOT NULL,
    arrives_to VARCHAR(255) NOT NULL,
    belongs_to VARCHAR(255) NOT NULL
);`;
conn.query(createTableBuses, (err, result) => {
  if (err) throw err;
  console.log("Table created for buses");
});

router.post("/admin/bus/add", (req, res) => {
  //bus info will be id, bus_name, bus_number, bus_fare, bus_type, total_seats, departs_from, arrives_to, driver_id,
  if (!req.session) {
    return res.status(500).send("Session not initialized");
  }
  console.log(req.session);
  const {
    bus_name,
    bus_number,
    bus_type,
    bus_fare,
    total_seats,
    departs_from,
    arrives_to,
    driver_id,
  } = req.body;

  const admin_company = req.session.admin.companyName;

  conn.query(
    "INSERT INTO buses (bus_name, bus_number, bus_type, bus_fare, total_seats, departs_from, arrives_to, belongs_to) VALUES (?,?,?,?,?,?,?,?)",
    [
      bus_name,
      bus_number,
      bus_type,
      bus_fare,
      total_seats,
      departs_from,
      arrives_to,
      admin_company,
    ],
    (err, result) => {
      if (err) throw err;
      res.send("Bus added successfully");
    }
  );
});

module.exports = router;
