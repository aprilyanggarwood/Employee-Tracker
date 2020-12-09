const inquirer = require("inquirer");
let cTable = require("console.table");
require("dotenv").config();
const queries = require("./utils/queryBuilder");

// prompts for adding employee and role
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
        name: "role_id", //display TABLE employee - FOREIGN KEY role_id
        type: "list",
        message: "What is this employee's role?",
        choices: async () => {
          const roles = await queries.viewAll("role");
          return roles.map((eachRole) => ({
            name: eachRole.title,
            value: eachRole.id,
          }));
        },
      },
      {
        name: "manager_id", //display TABLE employee - FOREIGN KEY manager_id
        type: "list",
        message: "Who is this person's manager?",
        choices: async () => {
          const employees = await queries.viewAll("employee");
          return employees.map((eachEmployee) => ({
            name: `${eachEmployee.first_name} ${eachEmployee.last_name}`,
            value: eachEmployee.id,
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
        name: "department_id", //display TABLE role - FOREIGN KEY department_id
        type: "list",
        message: "Which department do you want to add this new role in?",
        choices: async () => {
          const departments = await queries.viewAll("department");
          return departments.map((eachDepartment) => ({
            name: `${eachDepartment.name}`,
            value: eachDepartment.id,
          }));
        },
      },
    ],
  };
  return prompts[key];
};

// prompts for update employee's role and manager
const updatePrompts = async (key) => {
  const basePrompt = [
    {
      name: "employee_id",
      type: "list",
      message: `Select an employee to update his/her ${key}`,
      choices: async () => {
        const employees = await queries.viewAll("employee");
        return employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
      },
    },
  ];

  const extraPrompts = {
    role: {
      name: "role_id", //display TABLE employee - FOREIGN KEY role_id
      message: "What is the new role of this employee?",
      type: "list",
      choices: async () => {
        const roles = await queries.viewAll("role");
        return roles.map((eachRole) => ({
          name: eachRole.title,
          value: eachRole.id,
        }));
      },
    },
    manager: {
      name: "manager_id", //display TABLE employee - FOREIGN KEY manager_id
      type: "list",
      message: "Who is the new manager for this employee?",
      choices: async () => {
        const employees = await queries.viewAll("employee");
        return employees.map((eachEmployee) => ({
          name: `${eachEmployee.first_name} ${eachEmployee.last_name}`,
          value: eachEmployee.id,
        }));
      },
    },
  };
  basePrompt.push(extraPrompts[key]);
  return basePrompt;
};

// prompts for remove employee , role and department
const removePrompts = async (key) => {
  const prompts = {
    employee: [
      {
        name: "id",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: async () => {
          const employees = await queries.viewAll("employee");
          return employees.map((eachEmployee) => ({
            name: `${eachEmployee.first_name} ${eachEmployee.last_name}`,
            value: eachEmployee.id,
          }));
        },
      },
    ],
    role: [
      {
        name: "id",
        type: "list",
        message: "Which role would you like to remove?",
        choices: async () => {
          const roles = await queries.viewAll("role");
          return roles.map((eachRole) => ({
            name: `${eachRole.title}`,
            value: eachRole.id,
          }));
        },
      },
    ],
    department: [
      {
        name: "id",
        type: "list",
        message: "Which department would you like to remove?",
        choices: async () => {
          const departments = await queries.viewAll("department");
          return departments.map((eachDepartment) => ({
            name: `${eachDepartment.name}`,
            value: eachDepartment.id,
          }));
        },
      },
    ],
  };
  return prompts[key];
};

startSearch();
// prompt for what to do
async function startSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Employees",
        "View Employees by Department",
        "View Employees by Manager",
        "View All Roles",
        "Add A Department",
        "Remove A Department",
        "Add An Employee",
        "Remove An Employee",
        "Add A Role",
        "Remove A Role",
        "Update An Employee Role",
        "Update An Employee Manager",
        "EXIT",
      ],
    })
    // use switch statment for wait each query to get it's result, and then pass the result in inquirer to update the database
    .then(async function (answer) {
      switch (answer.action) {
        case "View All Departments":
          const departments = await queries.viewAll("department");
          console.table(departments);
          break;
        case "View All Employees":
          const employees = await queries.viewAllEmployees("employee");
          console.table(employees);
          break;

        case "View All Roles":
          const roles = await queries.viewAllRoles("role");
          console.table(roles);
          break;

        case "Add A Department":
          const addDeptResponse = await inquirer.prompt({
            name: "name",
            type: "input",
            message: "What is the new department's name?",
          });
          await queries.addOne("department", addDeptResponse);
          console.log("deparment added!");
          break;

        case "Remove A Department":
          const removeDeptPrompt = await removePrompts("department");
          const deptResponse = await inquirer.prompt(removeDeptPrompt);
          await queries.removeOne("department", deptResponse);
          console.log("department removed!");
          break;

        case "Add An Employee":
          const employeePrompt = await addPrompts("employee");
          const employeeResponse = await inquirer.prompt(employeePrompt);
          await queries.addOne("employee", employeeResponse);
          console.log("employee added!");
          break;

        case "Remove An Employee":
          const removeEmpPrompt = await removePrompts("employee");
          const empResponse = await inquirer.prompt(removeEmpPrompt);
          await queries.removeOne("employee", empResponse);
          console.log("employee removed!");
          break;

        case "Add A Role":
          const rolePrompt = await addPrompts("role");
          const roleResponse = await inquirer.prompt(rolePrompt);
          await queries.addOne("role", roleResponse);
          console.log("role added!");
          break;

        case "Remove A Role":
          const removeRolePrompt = await removePrompts("role");
          const removeRoleResponse = await inquirer.prompt(removeRolePrompt);
          await queries.removeOne("role", removeRoleResponse);
          console.log("role removed!");
          break;

        case "Update An Employee Role":
          const updateRolePrompt = await updatePrompts("role");
          const updateRoleResponse = await inquirer.prompt(updateRolePrompt);
          await queries.updateOne(
            "employee",
            { role_id: updateRoleResponse.role_id },
            { id: updateRoleResponse.employee_id }
          );
          console.log("employee'role updated!");
          break;

        case "Update An Employee Manager":
          const updateManagerPrompt = await updatePrompts("manager");
          const updateManagerResponse = await inquirer.prompt(
            updateManagerPrompt
          );
          await queries.updateOne(
            "employee",
            { manager_id: updateManagerResponse.manager_id },
            { id: updateManagerResponse.employee_id }
          );
          console.log("employee's manager updated!");
          break;

        case "View Employees by Department":
          const viewByDeptPrompt = {
            name: "id",
            type: "list",
            message: "Which Department would you like to view?",
            choices: async () => {
              const departs = await queries.viewAll("department");
              return departs.map((eachDepartment) => ({
                name: eachDepartment.name,
                value: eachDepartment.id,
              }));
            },
          };
          const depts = await inquirer.prompt(viewByDeptPrompt);
          // console.log(depts);
          const empByDept = await queries.viewEmpByDept(depts);
          console.table(empByDept);

          break;

        case "View Employees by Manager":
          const viewByManaPrompt = {
            name: "manager_id",
            type: "list",
            message: "Which Manager would you like to view?",
            choices: async () => {
              const managers = await queries.viewAllManagers();
              // console.log(managers);
              const mappedManagers = managers.reduce((a, b) => {
                if (b.manager_id) {
                  if (!a.some((item) => item.value === b.manager_id))
                    a.push({ name: b.Manager, value: b.manager_id });
                }
                return a;
              }, []);
              // console.log(mappedManagers);
              return mappedManagers;
            },
          };
          const employs = await inquirer.prompt(viewByManaPrompt);
          const empByMana = await queries.viewEmpByMana(employs);
          console.table(empByMana);

          break;
      }

      setTimeout(startSearch, 1000); //  The function (the function name) is passed to setTimeout() as an argument.
    });
}
