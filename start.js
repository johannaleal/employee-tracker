const inquirer = require('inquirer');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Trilogy2021',
  database: 'employeeTrackerB',
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

    switch (actionSelected) {
        case "View all employees":
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

const readEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employees', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  };

// USER INTERACTIONS ==========================

// Prompt the user to get answers to questions.
inquirer
  .prompt(menu)
  // Write a ReadMe file using the amswers to the prompts.
  .then(userResponse => {
    processUserSelection(userResponse);
  })
  // If there is an error, write an error to the console.
  .catch(err => {
    console.error(err);
  })

