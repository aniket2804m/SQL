const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'aniketsurya@2004'
});

let getRandomUser = () => {
  return [
   faker.string.uuid(),
   faker.internet.username(), // before version 9.1.0, use userName()
   faker.internet.email(),
   faker.internet.password(),
  ];
}

console.log(getRandomUser());

app.get("/", (req, res) => {
  let q = `mysql> SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
} catch (err) {
    console.log(err);
    res.send("some error in DB")
}
  res.send("welcome to home page");
})

app.listen("8080", () => {
  console.log("server is listening to port 8080");
})

// inserting New data
// let q ="INSERT INTO user (id, username, email, password) VALUES ?";



// connection.end();
