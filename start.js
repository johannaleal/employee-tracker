// DEPENDENCIES
const inquirer = require("inquirer");

const viewAllEmployees = require("./lib/viewAllEmployees.js");
const viewEmployeesByManager = require("./lib/viewEmployeesByManager.js");
const addEmployee = require("./lib/addEmployee.js");
const viewAllDepartments = require("./lib/viewAllDepartments.js");
const viewAllRoles = require("./lib/viewAllRoles.js");

//const chalk = require('chalk');
var figlet = require('figlet');

// Display Employee Tracker banner.
figlet('Employee Tracker', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});

const menu = [
     // Menu items
     {
        type: "list",
        name: "menuItemSelection",
        message: "What would you like to do?",
        choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add an employee",
                "Update employee role",
                "Remove an employee",
                "View all departments",
                "Add department",
                "Remove department", 
                "View all roles",
                "Add role",
                "Remove role", 
                'View total utilized budget of a department',
                "Exit application"
                ]
      }
]

const processUserSelection = (actionSelected) => {
    console.log(actionSelected);

    switch (actionSelected) {
        case "View all employees": viewAllEmployees();
            break;
        case "View all employees by manager": viewEmployeesByManager()
            break;
        case "View all departments": viewAllDepartments();
            break;
        case "View roles": viewAllRoles();
            break;
        case "Add an employee": addEmployee();
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
};

const initApp = () => {

  // Display the menu and prompt user for menu selection.
  inquirer
    .prompt(menu)
    .then(userResponse => {
      processUserSelection(userResponse.menuItemSelection);
    })
    // If there is an error, write an error to the console.
    .catch(err => {
      console.error(err);
    });
  };

  initApp();
