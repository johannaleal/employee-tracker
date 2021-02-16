# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

In this project, I have created a command-line application

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation

1. Install node.js. It can be downloaded here: [node.js Downloads](https://nodejs.org/en/download/)
2. Install npm inquirer package by typing:
    >npm init -y ; npm install inquirer
3. Install npm mysql package: >npm insall mysql
4. Install npm console.table package: >npm insall console.table --save
5. Make sure that the following files exist in your application folder:
    >start.js
    >.gitignore
6. The .gitignore file should contain the following lines:
    >node_modules/
    >.DS_Store/

## Usage

To run this app, open the console in the directory where the start.js file is and run the following command:
>node start

You will select from a menu list as follows:

* View all employees
* View all employees by department
* View all employees by manager"
* Add an employee
* Remove an employee
* Update employee role
* Update employee manager

![Demo GIF](./images/ReadMeGeneratorWalkthrough.gif)

## Screenshots

### Menu Items

![Menu Items](./images/enter-data.PNG)

### View All Employees

![View All Employees](./images/license-prompt.PNG)

## License

This application is covered under license: MIT License.

## Contributing

If you would like to contribute to this repository, please contact me via the email below to discuss the changes you wish to make.

## Tests

To test, follow these instructions:

1. Type in terminal:
    > node index.js
2. Follow all the prompts and enter data.
3. When the file has been successfully created you will get a success message.
4. Go to your application directory and verify that the ReadMe file is there.
5. Open it and verify that all the data you entered is there.

_NOTE: FOR TESTING PURPOSES I NAMED THE OUTPUT FILE README_TEST.MD SO AS NOT TO OVERWRITE MY ACTUAL README FILE. YOU CAN CHANGE THIS IN THE writeUserInfo CONST IN THE INDEX.JS FILE (LINE 101)._

## Questions

### Contact Information

GitHub Profile: [@johannaleal](http://github.com/johannaleal)

Email: <johannarleal@gmail.com>
