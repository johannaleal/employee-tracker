const viewAllEmployees = () => {
  const connection = require("../connection.js");

  console.log('Selecting all employees...\n');
  
  // Build SQL SELECT statement to get all employees ordered by last_name, first_name.
  const query = "SELECT e.id, e.first_name, e.last_name, title, d.name AS department, IFNULL(CONCAT(m.first_name,' ', m.last_name), 'None') AS maanager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name, e.first_name";

  connection.query(query, (err, res) => {
    if (err) {
      throw err;
    };

    // Log all results of the SELECT statement.
    console.table(res);
    connection.end();
  });
};

module.exports = viewAllEmployees;
