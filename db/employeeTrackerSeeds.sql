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
      ("Human Resources"), 
      ("Sales"), 
      ("Marketing"),
			("Client Services");

INSERT INTO role (title, salary, department_id) 
	VALUES 	("Vice President", 175000, 1), 
			("Software Engineer", 120000, 1), 
			("Director PMO", 160000, 2), 
      ("Project Manager", 110000, 2), 
      ("CPA", 170000, 3), 
      ("CFO", 250000, 3), 
      ("Financial Analyst", 150000, 3), 
      ("HR Representative", 90000, 4), 
      ("HR Director", 165000, 4), 
      ("Account Manager", 125000, 5), 
      ("Sales Representative", 80000, 5), 
      ("Marketing Director", 180000, 6), 
      ("Marketing Analyst", 130000, 6), 
      ("Client Manager", 140000, 7), 
      ("Customer Suppert", 120000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
	VALUES 	('Gary', 'Gilmore', 1, null),
			  ('John', 'Johnson', 2, 1),
        ('Susan', 'Sondheim', 3, null),
        ('Madison', 'Morgan', 4, 3),
        ("Kyle", "Collins", 6, null),
        ("Adam", "Arnold", 5, 5),
        ("David", "Gomez", 7, 5),
        ("Ashley", "Rhondo", 9, null),
        ("Lamar", "Jones", 8, 8),
        ("Corinne", "Kawinsky", 12, null);
            