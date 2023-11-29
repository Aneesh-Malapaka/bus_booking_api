const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MySQLStore = require("express-mysql-session")(session);

const db = require("./db");
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const getBusRoute = require("./routes/bus/fetch_buses_by_company");
const getAllBusRoute = require("./routes/bus/fetch_all_buses.js");
const getSpecificBusRoute = require("./routes/bus/fetch_specific_bus");
const postBusRoute = require("./routes/bus/add_buses");
const deleteBusRoute = require("./routes/bus/delete_bus.js");
const app = express();
const port = process.env.PORT || 3030;

const sessionStore = new MySQLStore(
  {
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db.connection
);

app.use(
  session({
    //secret is a version 4 uuid
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(cors());
app.use(express.json());

//using the router files
app.use(registerRoute);
app.use(loginRoute);
app.use(getBusRoute);
app.use(postBusRoute);
app.use(deleteBusRoute);
app.use(getAllBusRoute);
app.use(getSpecificBusRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
