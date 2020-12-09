const { createConnection } = require("mysql");
const util = require("util");
require("dotenv").config();

const connection = createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.SQLPW,
  database: "aycompany_db",
});

connection.query = util.promisify(connection.query);
// build queries for exporting them to switch statment to get result for async function
const queries = {
  viewAll(table) {
    return connection.query(`SELECT * FROM ${table}`);
  },

  viewAllEmployees(condition) {
    return connection.query(
      `SELECT e.id AS ID, e.first_name AS First_Name,
e.last_name AS Last_Name,
d.name AS Department,
d.id AS Dept_ID,
r.title AS Title,
r.salary As Salary, 
CONCAT(m.first_name,' ',m.last_name) AS Manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY e.id`
    );
  },

  viewAllRoles(condition) {
    return connection.query(
      `SELECT 
r.id AS Role_ID,
r.title AS Title,
r.salary As Salary, 
d.name AS Department,
d.id AS Dept_ID
FROM role r
JOIN department d ON r.department_id = d.id
ORDER BY r.id`
    );
  },

  viewEmpByDept(condition) {
    // console.log(condition);
    return connection.query(
      `SELECT r.department_id AS Dept_ID, 
employee.first_name AS First_Name, employee.last_name AS Last_Name, 
r.title AS Title,
d.name AS Department 
FROM employee JOIN role r on employee.role_id = r.id 
JOIN department d on d.id = r.department_id
WHERE department_id=${condition.id}`
    );
  },

  viewEmpByMana(condition) {
    // console.log(condition);
    return connection.query(
      `SELECT  
CONCAT (e.id) AS ID,
CONCAT (e.first_name, ' ', e.last_name) AS Employee,
r.title AS Title,
(CONCAT(m.first_name,' ',m.last_name)) AS Manager
FROM employee e LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN employee m ON e.manager_id = m.id 
WHERE e.manager_id=${condition.manager_id}`
    );
  },

  viewAllManagers() {
    return connection.query(`SELECT e.manager_id,
(CONCAT(m.first_name,' ',m.last_name)) AS Manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id `);
  },

  addOne(table, data) {
    return connection.query(`INSERT INTO ${table} SET ?`, data);
  },
  updateOne(table, data, condition) {
    return connection.query(`UPDATE ${table} SET ? WHERE ?`, [data, condition]);
  },
  removeOne(table, condition) {
    return connection.query(`DELETE FROM ${table} WHERE ?`, condition);
  },
};

module.exports = queries;
