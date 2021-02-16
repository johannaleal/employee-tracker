// DEPENDENCIES
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Trilogy2021',
  database: 'employeeTrackerDB',
});

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
                "Add an employee",
                "Remove an employee",
                "Update employee role",
                "Update employee manager"
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
        case "Add an employee":
            break;
        case "Update employee role":
            break;
        case "Update employee manager":
            break;
            
    }

}

const viewAllEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('select e.id, first_name, last_name, title, d.name AS department from employee as e INNER JOIN role as r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  };

// USER INTERACTIONS ==========================

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

