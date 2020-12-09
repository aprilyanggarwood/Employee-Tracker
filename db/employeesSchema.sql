DROP DATABASE IF EXISTS aycompany_db;
CREATE DATABASE aycompany_db;
USE aycompany_db;


CREATE TABLE department (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employee(id)
);


-- build and run three tables: department,rol , and employee in mysql workbanch 



-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT,
--     manager_id INT,
--     PRIMARY KEY (id)
-- );



-- CREATE TABLE employee (
--   id INTEGER NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INTEGER UNSIGNED NOT NULL,
--   INDEX role_ind (role_id),
--   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
--   manager_id INTEGER UNSIGNED,
--   INDEX man_ind (manager_id),
--   CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
-- );

-- CREATE TABLE role (
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(30) NOT NULL,
--   salary DECIMAL(10, 2) NOT NULL,
--   department_id INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
-- );

-- CREATE TABLE role (
--   id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(30) UNIQUE NOT NULL,
--   salary DECIMAL(10,2) UNSIGNED NOT NULL,
--   department_id INTEGER UNSIGNED,
--   INDEX dep_ind (department_id),
--   CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
-- );