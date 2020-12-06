

INSERT INTO department (name)
VALUES 
("Executive"), 
("Human Resources"), 
("Payroll"), 
("Information Technology"), 
("Operations"), 
("Marketing"),
("Customer Service - Call Center"),
("Sales");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES 
("Regional Manager", 150000.00, 1),
("HR Recruiter", 55000.00, 2),
("Payroll Cleker", 40000.00, 3),
("IT Assistant", 70000.00, 4),
("Solution Delivery Manager", 120000.00, 5),
("Digital Marketing Assistant", 50000.00, 6),
("Customer Service Rep", 35000.00, 7),
("Sales Representative", 35000.00, 8);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Joy", "Wang", 1, NULL),
("Tom", "Philiph", 4, NULL),
("Donna", "Tran", 5, NULL),
("Tiffny", "Sam", 2, 1),
("David", "Simth", 2, 1),
("Dan", "Histly", 3, 2),
("Willim", "Dai", 6, 3),
("Stanley", "Kuang", 7, 4),
("September", "Macdona", 7, 4),
("jimy", "Telud", 7, 4),
("Bob", "Marcy", 8, 5),
("Tonny", "Marten", 8, 5),
("Ruby", "Marila", 8, 5);

SELECT * FROM employee;