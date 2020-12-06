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

const queries = {
  viewAll(table) {
    return connection.query(`SELECT * FROM ${table}`);
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
    console.log(condition);
    return connection.query(
      `SELECT  
CONCAT (e.id) AS ID,
CONCAT (e.first_name, ' ', e.last_name) AS Employee,
r.title AS Title,
CONCAT(m.first_name,' ',m.last_name) AS Manager
FROM employee e LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN employee m ON e.manager_id = m.id
WHERE manager_id=${condition.id}`
    );
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

// ViewEmpBy() = {`SELECT e.id AS ID, e.first_name AS First Name, e.last_name AS Last Name, r.title AS Title, d.name AS Department, r.salary As Salary, CONCAT(m.first_name,' ',m.last_name) AS Manager
// FROM employee e
// LEFT JOIN role r ON e.role_id = r.id
// LEFT JOIN department d ON r.department_id = d.id
// LEFT JOIN employee m ON e.manager_id = m.id
// WHERE department.name = ? manager_id = ? `}
