const db = require('./db/connection');
const inquirer = require('inquirer');
const res = require('express/lib/response');


const promptUser = () => {
    return inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Welcome to Employee-Tracker.  What would you like to do?',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee'        
        ]
    }]).then(select => {
        if (select.action === 'View Departments') {
            viewDept();
        }
        if (select.action === 'View Roles') {
            viewRoles();
        }
        if (select.action === 'View Employees') {
            viewEmployees();
        }
        if (select.action === 'Add a Department') {
            addDept();
        }
        if (select.action === 'Add a Role') {
            addRole();
        }
        if (select.action === 'Add an Employee') {
            addEmployee();
        }
    });
};

function continueOrQuit () {
    inquirer.prompt([{
        type: 'confirm',
        name: 'confirmPrompt',
        message: 'Would you like to select a new action?',
        default: true
    }]) .then(({ confirmPrompt }) => {
        if (confirmPrompt) {
            promptUser();
        }
    } )
};

function viewDept () {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        continueOrQuit();
    });
};

function viewRoles () {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        continueOrQuit();
    });
};

function viewEmployees () {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        continueOrQuit();
    });
};

function addDept (name) {
    inquirer.prompt([{
        type: 'input',
        name: 'deptName',
        message: 'What is the name of your new department?'
    }])
        .then(name => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = [name.deptName];

            db.query(sql, params, (err, rows) => {
            if(err) {
            res.status(500).json({ error: err.message });
            return;
            }
            });

            viewDept();
        })

};

function addRole (title, salary, department_id) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: `What is the base salary for this role?`,
            validate: salary => {
                if (isNaN(salary)) {
                    console.log('Please enter a NUMBER.');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'dept',
            message: 'Please enter the department id for this role.',
            validate: dept => {
                if (isNaN(dept)) {
                    console.log('Please enter a NUMBER.');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
        .then(role => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [role.title, role.salary, role.dept];

            db.query(sql, params, (err, rows) => {
                if(err) {
                res.status(500).json({ error: err.message });
                return;
                }
                console.log(title, salary, department_id, 'added to the role table.');
            });

            viewRoles();
        });
};

function addEmployee (first_name, last_name, role_id, manager_id) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`
        },
        {
            type: 'input',
            name: 'role',
            message: `What is the employee's role id?`,
            validate: role => {
                if (isNaN(role)) {
                    console.log('Please enter a NUMBER.');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: `Please enter the employee id of this employee's manager.`,
            validate: manager => {
                if (isNaN(manager)) {
                    console.log('Please enter a NUMBER.');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
        .then(employee => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            const params = [employee.firstName, employee.lastName, employee.role, employee.manager];

            db.query(sql, params, (err, rows) => {
                if(err) {
                res.status(500).json({ error: err.message });
                return;
                }
            });
            viewEmployees();
        });
};

promptUser();