const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bus_api_db",
});

const connect = () => {
  conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");

    conn.query("CREATE DATABASE IF NOT EXISTS bus_api_db", (err, result) => {
      if (err) throw err;
      console.log("Database created!");
    });
  });
};

module.exports = {
  connect,
  connection: conn,
};
