INSERT INTO department (name)
VALUES
('HR'),
('Accounting'),
('Engineering'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Head of HR', 50000, 1),
('HR Specialist', 40000, 1),
('Senior Accountant', 60000, 2),
('Assistant Accountant', 45000, 2),
('Senior Engineer', 100000, 3),
('Engineer', 80000, 3),
('Junior Engineer', 60000, 3),
('Head of Sales', 100000, 4),
('Sales Rep', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jenny', 'Curran', 1, 1),
('Bubba', 'Blue', 2, 1),
('Tiger', 'Woods', 3, 3),
('Michelle', 'Wie', 4, 3),
('Dan', 'Taylor', 5, 5),
('Jeremy', 'Clarkson', 6, 5),
('James', 'May', 7, 5),
('Richard', 'Hammond', 8, 8),
('Chris', 'Harris', 9, 8);