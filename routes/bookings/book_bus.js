const db = require("../../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const conn = db.connection;

//in progress
//creating bus table
const createTableBooking = `CREATE TABLE IF NOT EXISTS bookings  (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bus_name VARCHAR(255) NOT NULL,
    bus_number INT NOT NULL UNIQUE,
    bus_id INT NOT NULL,
    bus_type VARCHAR(100) NOT NULL,
    bus_fare FLOAT(2) NOT NULL,
    total_seats INT NOT NULL,
    departs_from VARCHAR(255) NOT NULL,
    arrives_to VARCHAR(255) NOT NULL,
    belongs_to VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    booking_status VARCHAR(100) NOT NULL,
    booking_id INT NOT NULL UNIQUE,
    booked_by VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (bus_id) REFERENCES buses(id),
    FOREIGN KEY (user_id) REFERENCES registerusers(id)
);`;
conn.query(createTableBooking, (err, result) => {
  if (err) throw err;
  console.log("Table created for booking");
});

//creating seats booked table
const createTableSeatsReserved = `CREATE TABLE IF NOT EXISTS seats_reserved  (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   bus_id INT NOT NULL,
   user_id INT NOT NULL,
   seat_number INT NOT NULL,
);`;
conn.query(createTableSeatsReserved, (err, result) => {
  if (err) throw err;
  console.log("Table created for booking");
});

router.post("/api/bookings", (req, res) => {
  //the user when selected a bus and clicks on book ticket after selecting relevant info like date, seat.no, etc..

  if (!req.session) {
    return res.status(500).send("Session not initialized");
  }
  console.log(req.session);

  const {
    //info of booking table
    bus_id,
    bus_number,
    bus_name,
    bus_type,
    bus_fare,
    total_seats,
    departs_from,
    arrives_to,
    belongs_to,
    booking_date,
    booking_time,
    booking_status,
    booking_id,
    booked_by,
    user_id,
    seats_selected,
  } = req.body;

  conn.query(
    "INSERT INTO bookings (bus_id,bus_number,bus_name, bus_type, bus_fare, total_seats, departs_from, arrives_to, belongs_to, booking_date, booking_time, booking_status, booking_id, booked_by, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      bus_id,
      bus_number,
      bus_name,
      bus_type,
      bus_fare,
      total_seats,
      departs_from,
      arrives_to,
      belongs_to,
      booking_date,
      booking_time,
      booking_status,
      booking_id,
      booked_by,
      user_id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send("booking added successfully");
    }
  );

  //insert the seat numbers specifically the selected ones into a seperate table to make sure selected seats are not booked by others
  for (const seatNumber of seats_selected) {
    conn.query(
      "INSERT INTO seats (bus_id, user_id, seat_number) VALUES (?, ?, ?)",
      [bus_id, user_id, seatNumber],
      (err, result) => {
        if (err) throw err;
        res.send("seats reserved added successfully");
      }
    );
  }
});
module.exports = router;
