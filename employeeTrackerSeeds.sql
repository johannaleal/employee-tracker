DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- Insert test data into tables. -- 
INSERT INTO department (name) 
	VALUES 	("Informtion Technology"), 
			("Project Management Office"), 
			("Finance"), 
			("Client Services");

INSERT INTO role (title, salary, department_id) 
	VALUES 	("Vice President", 175000, 1), 
			("Software Engineer", 120000, 1), 
			("Director PMO", 160000, 2), 
            ("Project Manager", 110000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
	VALUES 	('Gary', 'Gilmore', 1, null),
			('John', 'Johnson', 2, 1),
            ('Susan', 'Sondheim', 3, null),
            ('Madison', 'Morgan', 4, 3);
            