const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const api = express();
const connection = mysql.createConnection({
  host: "localhost",
  user: "nodejs",
  password: "nodejs",
  database: "test"
});

connection.connect();

api.use(cors());
api.use(bodyParser.json());

api.get("/messages", (req, res) => {
  //res.send("salut");
  connection.query(
    "select * from messages limit 100",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

api.post("/message", (req, res) => {
  const message = mysql.escape(req.body.message);
  connection.query(
    `insert into messages (message) values(${message})`,
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      res.json({ success: true });
    }
  );
});

api.listen(3000, () => {
  console.log("Server started!");
});
