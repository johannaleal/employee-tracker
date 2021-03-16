const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Trilogy2021',
  database: 'employeeTrackerDB',
});

module.exports = connection;