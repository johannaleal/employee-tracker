const inquirer = require("inquirer");
const connection = require("../connection.js");
const viewAllDepartments = require("./viewAllDepartments.js");

// Validate required input.
const confirmResponse = (input) => {
    if (input === "") {
        return "This field is required!"
    }
    return true;
}

const addEmployee = () => {
    //console.log('Selecting all employees...\n');
     // Build SQL SELECT statement to get all managers ordered by last_name, first_name.
     const query = "SELECT id, title FROM role ORDER BY title";
     let roleTitles = [];
     let roles = [];
  
     connection.query(query, (err, results) => {
        if (err) throw err;

        rolesArray = results;
        
        results.forEach(({id, title}) => {
            roleTitles.push(title);
            roles.push({id, title});
        });
     });

    inquirer
        .prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
            validate: confirmResponse,
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
            validate: confirmResponse,
        },
        {
            name: "title",
            type: "list",
            choices: roleTitles,
            message: "Select the role for the employee.",
        },
        {
            name: "manager",
            type: "list",
            choices: roleTitles,
            message: "Select the employee's manager.",
        },
    ])
    .then((answer) => {
            console.log(answer);
        // when finished prompting, insert a new item into the db with that info
        // connection.query(
        //     'INSERT INTO employees SET ?',
        //     {
        //     last_name: answer.last_name,
        //     first_name: answer.first_name,
        //     role_id: answer.role,
        //     manager_id: answer.manager,
        //     },
        //     (err) => {
        //     if (err) throw err;
        //     console.log('The employee was created successfully!');
        //     start();
        //     }
        //);
    });
  
    // // Build SQL SELECT statement to get all employees ordered by last_name, first_name.
    // const query = "SELECT e.id, e.first_name, e.last_name, title, d.name AS department, IFNULL(CONCAT(m.first_name,' ', m.last_name), 'None') AS maanager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name, e.first_name";
  
    // connection.query(query, (err, res) => {
    //   if (err) throw err;
    //   // Log all results of the SELECT statement.
    //   console.table(res);
    //   connection.end();
    // });
};

module.exports = addEmployee;
