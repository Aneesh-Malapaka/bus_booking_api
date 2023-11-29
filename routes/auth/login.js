const db = require("../../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const conn = db.connection;

router.get("/api/auth/login", (req, res) => {
  if (!req.session) {
    return res.status(500).send("Session not initialized");
  }

  const { email, password } = req.body;
  console.log(email, password);
  //check if user already exists

  conn.query(
    "SELECT * FROM registeruser WHERE email =?",
    [email],
    (err, result) => {
      if (err) throw err.message;
      if (result.length > 0) {
        console.log(result);
        // compare entered pass with existing bcrypt pass and return success or failure

        bcrypt.compare(password, result[0].password, (err, resultCheck) => {
          if (err) throw err;
          console.log(resultCheck);
          if (resultCheck) {
            req.session.user = {
              id: result[0].id,
              name: result[0].name,
              email: result[0].email,
            };
            console.log("Welcome " + result[0].name);
            res.status(200).send("Welcome " + result[0].name);
          } else res.status(400).send("Wrong Credentials");
        });
      }
    }
  );
});

router.get("/api/auth/admin/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  conn.query(
    "SELECT * FROM registeradmin WHERE email =?",
    [email],
    (err, result) => {
      if (err) throw err.message;
      if (result.length > 0) {
        console.log(result);
        // compare entered pass with existing bcrypt pass and return success or failure

        bcrypt.compare(password, result[0].password, (err, resultCheck) => {
          if (err) throw err;
          console.log(resultCheck);
          if (resultCheck) {
            req.session.admin = {
              id: result[0].id,
              email: result[0].email,
              companyName: result[0].companyName,
            };

            console.log("Welcome " + result[0].name);
            res.status(200).send("Welcome " + result[0].name);
          } else res.status(400).send("Wrong Credentials");
        });
      }
    }
  );
});

module.exports = router;
