const inquirer = require("inquirer");

// add department
function addDepartment() {
  inquirer
    .prompt({
      name: "deptName",
      type: "input",
      message: "What is the new department's name?",
    })
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.deptName, function (err, results) {
        if (err) throw err;
        console.log(`A new department is added : $("answer.deptName")`);
        allDepartmentsSearch();
      });
    });
}

// remove department
function removeDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "deptName",
          type: "list",
          choices: function () {
            let choiceArray = results.map();// map function
            return choiceArray;

            // let choiceArray = [];
            // for (var i = 0; i < results.length; i++) {
            //   choiceArray.push(results[i].name.deptName);
            }
          message: "Which department would you like to remove?",
      },
        ])
      .then(function (answer) {
        const query = "DELETE FROM department WHERE name = ?;";
        connection.query(query, answer.deptName, function (err, results) {
          if (err) throw err;
          console.log("Department successfully deleted");
          allDepartmentsSearch();
        });
      });
  });
}

// add role
function addRole() {
  const query = "SELECT * FROM role"; // "SELECT * FROM departmet"; 
  connection.query(query, function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the title of the new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the new role?",
        },
        {
          name: "deptName",
          type: "list",
          choices: function () {
            let choiceArray = results.map();// map function
            return choiceArray;
            // choices: function () {
            //   const choicesArray = [];
            //   res.forEach((results) => {
            //     choicesArray.push(results.name.deptName);
            //   });
            //   return choicesArray;
            message: "Which department do you want to add this new role in?",
        
        },
        }
      ])
      // in order to get the id here, i need a way to grab it from the departments table
      .then(function (answer) {
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("New role successfully added");
            allRolesSearch()
          }
        );
      });
  });
}

// remove role

function removeRole() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "list",
          choices: function () {
            let choiceArray = results.map(); // how to use map ()
            return choiceArray;
          },
          message: "Select a Role to remove:",
        },
      ])
      .then((answer) => {
        connection.query(`DELETE FROM role WHERE ? `, {
          title: answer.roleTitle,
        });
        allRolesSearch()
      });
  });
}


// add employee
function addEmployee() {
  const query = "SELECT * FROM employee"
  connection.query(query, function (err, results) {
    if (err) throw err;
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "roleId",
                type: "input",
                message: "What is this employee's role Id?",
            },
            {
                name: "managerId",
                type: "input",
                message: "What is this employee's manager Id?",
            },
        ])
        .then((answer) => {
            
            connection.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New role added!\n");
                    // Call updateProduct AFTER the INSERT completes
                   allEmployeesSearch()
                }
            );
        });
}




module.exports = removeDepartment();
module.exports = addDepartment();
module.exports = addRole();
module.exports = removeRole();
module.exports = addEmployee();
module.exports = removeEmployee();

