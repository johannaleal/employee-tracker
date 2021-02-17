const connection = require("../connection.js");

const viewAllRoles = () => {
    console.log('Selecting all roles...\n');
  
    // Build SQL SELECT statement to get all employees ordered by role name.
    const query = "SELECT r.id, title, FORMAT(salary, 0) AS salary, d.name AS department FROM role AS r INNER JOIN department AS d ON r.department_id = d.id order by title;";
  
    connection.query(query, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement.
      console.table(res);
      connection.end();
    });
  };

  module.exports = viewAllRoles;