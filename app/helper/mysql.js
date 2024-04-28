const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 100,
  host: 'mysql-service', 
  user: "user",
  password: "password",
  database: "app",
  port: 3306
});

module.exports = connection;