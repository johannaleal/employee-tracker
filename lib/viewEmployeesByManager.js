const connection = require("../connection.js");
const inquirer = require("inquirer");
const managers = require("./getAllManagers.js");

//console.log(managers);

// Prompt the user to get answers to questions.
// inquirer
// .prompt(
//   {
//     type: "list",
//     name: "manager",
//     message: "Which manager's employees do you want to view?",
//     choices: [{viewAllManagers();}
//             ]
//   }
// )
// .then(userResponse => {
//   viewEmployeesByManager(userResponse.manager);
// })
// // If there is an error, write an error to the console.
// .catch(err => {
//   console.error(err);
// })
// };

 const viewEmployeesByManager = (manager) => {
//     console.log('Selecting all employees for selected manager...\n');
  
//     // Build SQL SELECT statement to get all employees ordered by department name.
//     const query = "SELECT e.id, e.first_name, e.last_name, title, d.name AS department, IFNULL(CONCAT(m.first_name,' ', m.last_name), 'None') AS maanager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE e.manager_id = ? ORDER BY e.last_name, e.first_name";
  
//     connection.query(query, (err, res) => {
//       if (err) throw err;
//       // Log all results of the SELECT statement.
//       console.table(res);
//       connection.end();
//     });
 };

module.exports = viewEmployeesByManager;