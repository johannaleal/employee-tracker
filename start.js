// DEPENDENCIES
const inquirer = require("inquirer");
const connection = require("./connection.js");
const figlet = require("figlet");

// Main menu array to be used for inquirer prompts
const menu = [
     // Menu items
     {
        type: "list",
        name: "menuItemSelection",
        message: "What would you like to do?",
        choices: [
                "View All Employees",
                "View All Employees by Manager",
                "View All Departments",
                "View All Roles",
                "Add an Employee",
                "Add a Department",
                "Add a Role",
                "Update Employee Role",
                "Update Employee Manager",
                "Remove an Employee",
                "Remove a Department",
                "Remove a Role", 
                "View Total Utilized Budget of a Department",
                "Exit Application",
                ]
      }
];

// Validate required input.
const confirmResponse = (input) => {
    if (input === "") {
        return "This field is required!"
    }
    return true;
};

const viewAllEmployees = () => {
    console.log('\nSelecting all employees...\n');
    
    // Build SQL SELECT statement to get all employees ordered by last_name, first_name.
    const query = "SELECT e.id, e.first_name, e.last_name, title, d.name AS department, IFNULL(CONCAT(m.first_name,' ', m.last_name), 'None') AS maanager FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name, e.first_name";
    
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement.
        console.table(res);

        // Display the main menu.
        console.log("\n");
        displayMenu();
    });
};

const viewEmployeesByManager = () => {
    console.log('\nSelecting all employees grouped by manager...\n');
    
    // Build SQL SELECT statement to get all employees ordered by last_name, first_name.
    const query = "SELECT (CONCAT(m.first_name,' ', m.last_name)) AS maanager, e.id As employee_id, e.first_name, e.last_name, title, d.name AS department FROM employee AS e INNER JOIN role AS r ON e.role_id = r.id INNER JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE e.manager_id IS NOT null ORDER BY m.last_name, m.first_name, e.last_name, e.first_name";
    
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement.
        console.table(res);

        // Display the main menu.
        console.log("\n");
        displayMenu();
    });
};

const viewTotalUtilizedBudget = () => {
    console.log('\nGenerating your report...\n');

    let query = "SELECT id, name FROM department ORDER BY name";
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        let depts = [];

        // Store each title in the array.
        results.forEach(({name}) => {
            depts.push(name);
        });
    
        inquirer
            // Prompt for the department name.
            .prompt([
            {
                name: "department",
                type: "list",
                choices: depts,
                message: "Which department's total utilized budget do you want to view?",
            },
        ])
        .then((answer) => {
            let chosenDept;

            results.forEach((department) => {
                if (department.name === answer.department) {
                    chosenDept = department.id;
                }
            });

            query = "SELECT d.name AS department, CONCAT('$', FORMAT(SUM(salary), 2)) AS total_budget FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id WHERE d.id = " + chosenDept + " GROUP BY d.name ORDER BY d.name";
    
            connection.query(query, (err, res) => {
            if (err) throw err;

            // Log all results of the SELECT statement.
            console.table(res);

            // Display the main menu.
            console.log("\n");
            displayMenu();
        });
        });
    });
};

const viewAllDepartments = () => {
    console.log("\nSelecting all departments...\n");
  
    // Build SQL SELECT statement to get all departments ordered by department name.
    const query = "SELECT id, name AS department FROM department ORDER BY name";
  
    connection.query(query, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement.
      console.table(res);
      //connection.end();

      // Display the main menu.
      console.log("\n");
      displayMenu();
    });
};

const viewAllRoles = () => {
    console.log('\nSelecting all roles...\n');
  
    // Build SQL SELECT statement to get all employees ordered by role name.
    const query = "SELECT r.id, title, FORMAT(salary, 0) AS salary, d.name AS department FROM role AS r INNER JOIN department AS d ON r.department_id = d.id order by title;";
  
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement.
        console.table(res);
        //connection.end();

        // Display the main menu.
        console.log("\n");
        displayMenu();
    });
};

const addEmployee = () => {
    // Get all the roles and store in an array to be used in 
    // the role inquirer list.
    let query = "SELECT id, title FROM role ORDER BY title";
    let roleResults;
    let roles = [];
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        roleResults = results;

        // Store each title in the array.
        results.forEach(({title}) => {
            roles.push(title);
        });
    });

    // Get all the employees and store in an array to be used in 
    // the manager inquirer list.
    query = "SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name";
    let mgrResults;
    let managers = ["None"];
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        mgrResults = results;

        // Store each employee name in the array.
        results.forEach(({name}) => {
            managers.push(name);
        });
    });

    inquirer
        // Prompt for employee information. Validate for required fields.
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
            choices: roles,
            message: "Select the employee's role.",
        },
        {
            name: "manager",
            type: "list",
            choices: managers,
            message: "Select the employee's manager.",
        },

    ])
    .then((answer) => {
        // Find the chosen role object in order to get the id.
        let chosenRole;

        roleResults.forEach((role) => {
            if (role.title === answer.title) {
                chosenRole = role.id;
            }
        });
        console.log(chosenRole);

        // Find the chosen manager object by matching first name and last name in order to get the id.
        // Only do this if one was chosen.
        let chosenMgr = null;

        if (answer.manager != "None") {
            mgrResults.forEach((manager) => {
                if ((manager.name === answer.manager)) {
                    chosenMgr = manager.id;
                }
            });
        };

        // when finished prompting, insert a new item into the db with that info
        connection.query(
            'INSERT INTO employee SET ?',
            {
                last_name: answer.last_name,
                first_name: answer.first_name,
                role_id: chosenRole,
                manager_id: chosenMgr,
            },
            (err) => {
                if (err) throw err;

                console.log('\nThe employee was created successfully!\n');
                
                 // Display the main menu.
                displayMenu();
            }
        );
    });
};

const addDepartment = () => {
    inquirer
        // Prompt for the department name.
        .prompt([
        {
            name: "department",
            type: "input",
            message: "What is the department name?",
            validate: confirmResponse,
        },
    ])
    .then((answer) => {
        // When finished prompting, insert a new item into the db with that info.
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.department,
            },
            (err) => {
                if (err) throw err;

                console.log('\nThe department was created successfully!\n');
                
                 // Display the main menu.
                displayMenu();
            }
        );
    });
};

const addRole = () => {
    // Get all the departments and store in an array to be used in 
    // the department inquirer list.
    let query = "SELECT * FROM department ORDER BY name";
    let deptResults;
    let departments = [];
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        deptResults = results;

        // Store each title in the array.
        results.forEach(({name}) => {
            departments.push(name);
        });
    });
    console.log(departments.length);

    inquirer
        // Prompt for the role information.
        .prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role's title?",
            validate: confirmResponse,
        },
        {
            name: "salary",
            type: "input",
            message: "What is the role's salary?",
            validate: confirmResponse,
        },
        {
            name: "department",
            type: "list",
            choices: departments,
            message: "Select the role's department.",
        },
    ])
    .then((answer) => {
        // When finished prompting, insert a new item into the db with that info.
        let chosenDept;

        deptResults.forEach((department) => {
            if (department.name === answer.department) {
                chosenDept = department;
            }
        });
        console.log(chosenDept);

        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: chosenDept.id,
            },
            (err) => {
                if (err) throw err;

                console.log('\nThe role was created successfully!\n');
                
                 // Display the main menu.
                displayMenu();
            }
        );
    });
};

const updateEmployeeRole = () => {
     // Get all the roles and store in an array to be used in 
    // the role inquirer list.
    let query = "SELECT id, title FROM role ORDER BY title";
    let roleResults;
    let roles = [];
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        roleResults = results;

        // Store each title in the array.
        results.forEach(({title}) => {
            roles.push(title);
        });
    });

    // Get all the employees and store in an array to be used in 
    // the manager inquirer list.
    query = "SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name";
    let employeeResults;
    let employees = [];
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        employeeResults = results;

        // Store each employee name in the array.
        results.forEach(({name}) => {
            employees.push(name);
        });
    });

    inquirer
        // Prompt for employee information. Validate for required fields.
        .prompt([
        {
            name: "verify",
            type: "input",
            message: "Press ENTER to continue.",
        },
        {
            name: "employee",
            type: "list",
            choices: employees,
            message: "Select the employee whose role you want to change.",
        },
        {
            name: "title",
            type: "list",
            choices: roles,
            message: "Select the employee's new title.",
        },
    ])
    .then((answer) => {
        // Find the chosen role object in order to get the id.
        let chosenRole;

        roleResults.forEach((role) => {
            if (role.title === answer.title) {
                chosenRole = role.id;
            }
        });

        // Find the chosen manager object by matching first name and last name in order to get the id.
        // Only do this if one was chosen.
        let chosenEmployee = null;

        employeeResults.forEach((employee) => {
            if ((employee.name === answer.employee)) {
                chosenEmployee = employee.id;
            }
        });

        // when finished prompting, insert a new item into the db with that info
        connection.query(
            'UPDATE employee SET ? WHERE ?',
            [
                { role_id: chosenRole, },
                { id: chosenEmployee, }
            ],
            (err) => {
                if (err) throw err;

                console.log("\nThe employee's role was successfully!\n");
                
                 // Display the main menu.
                displayMenu();
            }
        );
    });
};

const updateEmployeeManager = () => {
    // Get all the employees and store in an array to be used in 
   // the manager inquirer list.
   query = "SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name";
 
   connection.query(query, (err, results) => {
        if (err) throw err;

        let employees = [];

        // Store each employee name in the array.
        results.forEach(({name}) => {
            employees.push(name);
        });

        inquirer
            // Prompt for employee information. Validate for required fields.
            .prompt([
            // {
            //     name: "verify",
            //     type: "input",
            //     message: "Press ENTER to continue.",
            // },
            {
                name: "employee",
                type: "list",
                choices: employees,
                message: "Select the employee whose manager you want to change.",
            },
            {
                name: "manager",
                type: "list",
                choices: employees,
                message: "Select the employee's new manager.",
            },
        ])
        .then((answer) => {
            // Find the chosen manager object by matching first name and last name in order to get the id.
            // Only do this if one was chosen.
            let chosenEmployee;

            results.forEach((employee) => {
                if ((employee.name === answer.employee)) {
                    chosenEmployee = employee.id;
                }
            });

            let chosenManager;

            results.forEach((employee) => {
                if ((employee.name === answer.manager)) {
                    chosenManager = employee.id;
                }
            });

            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    { manager_id: chosenManager, },
                    { id: chosenEmployee, }
                ],
                (err) => {
                    if (err) throw err;

                    console.log("\nThe employee's manager was successfully!\n");
                    
                        // Display the main menu.
                    displayMenu();
                }
            );
        });
    });
};

const removeEmployee = () => {
    let query = "SELECT id, CONCAT(last_name, ', ', first_name) AS name FROM employee ORDER BY last_name, first_name";
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        let employees = [];

        // Store each title in the array.
        results.forEach(({name}) => {
            employees.push(name);
        });
    
        inquirer
            // Prompt for the employee name.
            .prompt([
            {
                name: "employee",
                type: "list",
                choices: employees,
                message: "Which employee do you want to delete?",
            },
        ])
        .then((answer) => {
            let chosenEmployee;

            results.forEach((employee) => {
                if (employee.name === answer.employee) {
                    chosenEmployee = employee.id;
                }
            });

            connection.query(
                'DELETE FROM employee WHERE ?',
                {
                    id: chosenEmployee,
                },
                (err) => {
                    if (err) throw err;

                    console.log('\nThe employee was removed successfully!\n');
                    
                    // Display the main menu.
                    displayMenu();
                }
            );
        });
    });
};

const removeDepartment = () => {
    let query = "SELECT id, name FROM department ORDER BY name";
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        let depts = [];

        // Store each title in the array.
        results.forEach(({name}) => {
            depts.push(name);
        });
    
        inquirer
            // Prompt for the department name.
            .prompt([
            {
                name: "department",
                type: "list",
                choices: depts,
                message: "Which department do you want to delete?",
            },
        ])
        .then((answer) => {
            let chosenDept;

            results.forEach((department) => {
                if (department.name === answer.department) {
                    chosenDept = department.id;
                }
            });

            connection.query(
                'DELETE FROM department WHERE ?',
                {
                    id: chosenDept,
                },
                (err) => {
                    if (err) throw err;

                    console.log('\nThe department was removed successfully!\n');
                    
                    // Display the main menu.
                    displayMenu();
                }
            );
        });
    });
};

const removeRole = () => {
    let query = "SELECT id, title FROM role ORDER BY title";
  
    connection.query(query, (err, results) => {
        if (err) throw err;

        let roles = [];

        // Store each title in the array.
        results.forEach(({title}) => {
            roles.push(title);
        });
    
        inquirer
            // Prompt for the title name.
            .prompt([
            {
                name: "title",
                type: "list",
                choices: roles,
                message: "Which title do you want to delete?",
            },
        ])
        .then((answer) => {
            let chosenRole;

            results.forEach((role) => {
                if (role.title === answer.title) {
                    chosenRole = role.id;
                }
            });

            connection.query(
                'DELETE FROM role WHERE ?',
                {
                    id: chosenRole,
                },
                (err) => {
                    if (err) throw err;

                    console.log('\nThe title was removed successfully!\n');
                    
                    // Display the main menu.
                    displayMenu();
                }
            );
        });
    });
};

const processUserSelection = (actionSelected) => {
    switch (actionSelected) {
        case "View All Employees": viewAllEmployees();
            break;
        case "View All Employees by Manager": viewEmployeesByManager();
            break;
        case "View All Departments": viewAllDepartments();
            break;
        case "View All Roles": viewAllRoles();
            break;
        case "Add an Employee": addEmployee();
            break;
        case "Add a Department": addDepartment();
            break;
        case "Add a Role": addRole();
            break;
        case "Update Employee Role": updateEmployeeRole();
            break;
        case "Update Employee Manager": updateEmployeeManager();
            break;
        case "Remove an Employee": removeEmployee();
            break;
        case "Remove a Department": removeDepartment();
            break;
        case "Remove a Role": removeRole();;
            break;
        case "View Total Utilized Budget of a Department": viewTotalUtilizedBudget();
            break;
        case "Exit Application":
            console.log("\n\nExiting application...\n");
            connection.end();
          break;
    };
};
    
// Display the menu and prompt user for menu selection.
const displayMenu = () => {
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

const run = () => {

    // Display Employee Tracker banner using the npm figlet package.
    figlet("Employee Tracker", (err, data) => {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);

        // Display Employee Tracker menu.
        displayMenu();
    });
};

run();
