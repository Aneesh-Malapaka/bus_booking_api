const db = require("../../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//bcrypt config
const saltRounds = Math.floor(Math.random() * 2) + 10;

//user table
const conn = db.connection;
const createTableQueryUsers = `CREATE TABLE IF NOT EXISTS registeruser  (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user'

);`;
conn.query(createTableQueryUsers, (err, result) => {
  if (err) throw err;
  console.log("Table created");
});

//admin table
const createTableQueryAdmins = `CREATE TABLE IF NOT EXISTS registeradmin  (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      companyName VARCHAR(255) NOT NULL UNIQUE,
      role VARCHAR(255) NOT NULL DEFAULT 'admin'
      );`;

conn.query(createTableQueryAdmins, (err, result) => {
  if (err) throw err;
  console.log("Table created");
});

router.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  //check if user already exists

  conn.query(
    "SELECT * FROM registeruser WHERE email =?",
    [email],
    (err, result) => {
      if (err) throw err.message;
      if (result.length > 0) {
        res.status(400).send("User already exists");
      } else {
        //create user
        // bcrypt
        //   .hash(password, saltRounds)
        //   .then((hash) => (hashedPassword = hash))
        //   .catch((err) => console.log(err));

        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        conn.query(
          "INSERT INTO registeruser (name, email, password) VALUES (?,?,?)",
          [name, email, hashedPassword],
          (err, resultInsert) => {
            if (err) throw err.message;
            res.status(201).send("User created");
          }
        );
      }
    }
  );
});

router.post("/api/auth/admin/register", (req, res) => {
  const { name, email, password, companyName } = req.body;
  console.log(name, email, password, companyName);
  //check if user already exists

  conn.query(
    "SELECT * FROM registeradmin WHERE email =?",
    [email],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(400).send("Admin account already exists");
      } else {
        //create user
        // bcrypt
        //   .hash(password, saltRounds)
        //   .then((hash) => (hashedPassword = hash))
        //   .catch((err) => console.log(err));

        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        conn.query(
          "INSERT INTO registeradmin (name, email, password, companyName) VALUES (?,?,?,?)",
          [name, email, hashedPassword, companyName],
          (err, resultInsert) => {
            if (err) throw err;
            console.log(name, email, password, companyName);
            res.status(201).send("Admin created");
          }
        );
      }
    }
  );
});

module.exports = router;
