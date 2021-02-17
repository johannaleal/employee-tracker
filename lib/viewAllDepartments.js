const connection = require("../connection.js");

const viewAllDepartments = () => {
    console.log('Selecting all departments...\n');
  
    // Build SQL SELECT statement to get all employees ordered by department name.
    const query = "SELECT id, name AS department FROM department ORDER BY name";
  
    connection.query(query, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement.
      console.table(res);
      connection.end();
    });
};

module.exports = viewAllDepartments;