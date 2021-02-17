const connection = require("../connection.js");

function getAllManagers() {
    console.log('Selecting all managers...\n');
  
    // Build SQL SELECT statement to get all managers ordered by last_name, first_name.
    const query = "SELECT e.id, e.first_name, e.last_name FROM employee WHERE manager_id IS NOT NULL ORDER BY last_name, first_name";
  
    connection.query(query, (err, res) => {
      if (err) throw err;
      
      return res;

      connection.end();
    });
};
