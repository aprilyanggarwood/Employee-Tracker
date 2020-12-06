// const mysql = require("mysql");
const inquirer = require("inquirer");
let cTable = require("console.table");
// require("dotenv").config();
const queries = require("./utils/queryBuilder");
const addPrompts = async (key) => {
  const prompts = {
    employee: [
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role_id",
        type: "list",
        message: "What is this employee's role?",
        choices: async () => {
          const roles = await queries.viewAll("role");
          return roles.map((role) => ({ name: role.title, value: role_id }));
        },
      },
      {
        name: "manager_id",
        type: "list",
        message: "Who is this person's manager?",
        choices: async () => {
          const employees = await queries.viewAll("employee");
          return employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: manager_id,
          }));
        },
      },
    ],

    role: [
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "department_name",
        type: "list",
        message: "Which department do you want to add this new role in?",
        choices: async () => {
          const departments = await queries.viewAll("department");
          return departments.map((department) => ({
            name: `${department.department_name}`,
            value: department_id,
          }));
        },
      },
    ],
    department: [
      {
        name: "department_name",
        type: "input",
        message: "What is the new department's name?",
        choices: async () => {
          const departments = await queries.viewAll("department");
          return departments.map((department) => ({
            name: `${department.department_name}`,
          }));
        },
      },
    ],
  };
  return prompts[key];
};

const removePrompts = async (key) => {
  const prompts = {
    employee: [
      {
        name: "full_name",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: async () => {
          const employees = await queries.viewAll("employee");
          return employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
          }));
        },
      },
    ],
    role: [
      {
        name: "title",
        type: "list",
        message: "Which role would you like to remove?",
        choices: async () => {
          const roles = await queries.viewAll("role");
          return roles.map((role) => ({
            name: `${role.title}`,
          }));
        },
      },
    ],
    department: [
      {
        name: "department_name",
        type: "list",
        message: "Which department would you like to remove?",
        choices: async () => {
          const departments = await queries.viewAll("department");
          return departments.map((department) => ({
            name: `${department.department_name}`,
          }));
        },
      },
    ],
  };
  return prompts[key];
};

const updatePrompts = async (key) => {
  const prompts = {
    employee: [
      {
        name: "full_name",
        type: "list",
        message: "Select an employee to update his/her role",
        choices: async () => {
          const employees = await queries.viewAll("employee");
          return employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
          }));
        },
      },
      {
        name: "role_id",
        type: "list",
        choices: async () => {
          const roles = await queries.viewAll("role");
          return roles.map((role) => ({ name: role.title, value: role_id }));
        },
      },
      {
        name: "manager_id",
        type: "list",
        choices: async () => {
          const employees = await queries.viewAll("employee");
          return employees.map((role) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: manager_id,
          }));
        },
      },
    ],
  };
  return prompts[key];
};

startSearch();
async function startSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "Add A Department",
        "Remove A Department",
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add An Employee",
        "Remove An Employee",
        "View All Roles",
        "Add A Role",
        "Remove A Role",
        "Update An Employee Role",
        "Update An Employee Manager",
        "EXIT",
      ],
    })
    .then(async function (answer) {
      switch (answer.action) {
        case "View All Departments":
          const departments = await queries.viewAll("department");
          console.table(departments);
          break;
        case "View All Employees":
          const employees = await queries.viewAll("employee");
          console.table(employees);
          break;
        case "View All Employees by Department":
          break;

        case "View All Employees by Manager":
          break;
        case "View All Roles":
          const roles = await queries.viewAll("role");
          console.table(roles);
          break;

        case "Add An Department":
          const newDept = await inquirer.prompt(departmentPrompt);
          const departmentPrompt = await addPrompts("department");
          await queries.addOne("department", newDept);
          console.log("department added!");
          break;

        case "Remove An Department":
          const removeDeptPrompt = await removePrompts("department");
          const currentDept = await inquirer.prompt(removeDeptPrompt);
          await queries.removeOne("department", currentDept);
          console.log("department removed!");
          break;

        case "Add An Employee": // works
          const employeePrompt = await addPrompts("employee");
          const employee = await inquirer.prompt(employeePrompt);
          await queries.addOne("employee", employee);
          console.log("employee added!");
          break;

        case "Remove An Employee":
          const removeEmpPrompt = await removePrompts("employee");
          const currentEmployee = await inquirer.prompt(removeEmpPrompt);
          await queries.removeOne("employee", currentEmployee);
          console.log("employee removed!");
          break;

        case "Add A Role":
          const rolePrompt = await addPrompts("role");
          const role = await inquirer.prompt(rolePrompt);
          await queries.addOne("role", role);
          console.log("role added!");
          break;

        case "Remove An Role":
          const removeRolePrompt = await removePrompts("role");
          const currentRole = await inquirer.prompt(removeRolePrompt);
          await queries.removeOne("role", currentRole);
          console.log("role removed!");
          break;

        case "Update An Employee Role":
          const employeePrompt = await updatePrompts("employee");
          const employee = await inquirer.prompt(employeePrompt);
          await queries.updateOne("employee", [
            employee.role_id,
            new role_id(),
          ]);
          console.log("employee'role updated!");
          break;

        case "Update An Employee Manager":
          const employeePrompt = await updatePrompts("employee");
          const employee = await inquirer.prompt(employeePrompt);
          await queries.updateOne("employee", [
            employee.manager_id,
            new manager_id(),
          ]);
          console.log("employee'role updated!");
          break;
      }

      setTimeout(startSearch, 1000);
    });
}
