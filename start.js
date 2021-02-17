// DEPENDENCIES
const inquirer = require('inquirer');
const connection = require("./connection.js");

let banner = require('simple-banner');

//require ("employeeTrackerCRUD.js");

// Validate required input.
const confirmResponse = (input) => {
    if (input === "") {
        return "This field is required!"
    }
    return true;
}

const menu = [
     // Menu items
     {
        type: "list",
        name: "menuItemSelection",
        message: "What would you like to do?",
        choices: ["View all employees",
                "View all employees by department",
                "View all employees by manager",
                "View departments",
                "View roles",
                "Add an employee",
                "Remove an employee",
                "Update employee role",
                "Update employee manager",
                "Add department",
                "Add role",
                "Exit"
            ]
    }
]

const processUserSelection = (actionSelected) => {
    console.log(actionSelected);

    switch (actionSelected) {
        case "View all employees": viewAllEmployees();
            break;
        case "View all employees by department":
            break;
        case "View all employees by manager":
            break;
        case "View departments":
            viewAllDepartments();
            break;
        case "View roles":
            viewAllRoles();
            break;
        case "Add an employee":
            break;
        case "Update employee role":
            break;
        case "Update employee manager":
            break;
        case "Add department":
            break;
        case "Addd role":
            break;
        case "Exit":
          console.end();
          break;
    }

}

const viewAllEmployees = () => {
  console.log('Selecting all employees...\n');

  // Build SQL SELECT statement to get all employees ordered by last_name, first_name.
  const query = "SELECT e.id, e.first_name, e.last_name, title, d.name AS department, IFNULL(CONCAT(m.first_name,' ', m.last_name), 'None') AS maanager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name, e.first_name";

  connection.query(query, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement.
    console.table(res);
    connection.end();
  });
};
  
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

// USER INTERACTIONS ==========================
banner.set("EMPLOYEE TRACKER");

// Prompt the user to get answers to questions.
inquirer
  .prompt(menu)
  // Write a ReadMe file using the amswers to the prompts.
  .then(userResponse => {
    processUserSelection(userResponse.menuItemSelection);
  })
  // If there is an error, write an error to the console.
  .catch(err => {
    console.error(err);
  })

