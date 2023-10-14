CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(40),
    passcode VARCHAR(40),
    email VARCHAR(40) UNIQUE,
    gender VARCHAR(1),
    job_title VARCHAR(40),
    years_with_comp INT,
    date_joined DATE,
    employer_id INT,
);

CREATE TABLE employer (
    employer_id INT PRIMARY KEY AUTO_INCREMENT,
    employer_name VARCHAR(40),
    passcode VARCHAR(40),
    email VARCHAR(40) UNIQUE,
    size INT,
    industry VARCHAR(40),
    form_freq INT,
    categories VARCHAR(255),
);

ALTER TABLE employee
ADD FOREIGN KEY(employer_id)
REFERENCES employer(employer_id)
ON DELETE SET NULL;

CREATE TABLE form (
    form_id INT PRIMARY KEY AUTO_INCREMENT,
    curr_date DATE,
    title VARCHAR(40),
    form_description VARCHAR(200),
    employer_id INT,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id) ON DELETE CASCADE,
);

CREATE TABLE question (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    average DECIMAL,
    text VARCHAR(200),
    category VARCHAR(50),
    num_responses INT,
    form_id INT,
    FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE
);

CREATE TABLE response (
    response_id INT PRIMARY KEY AUTO_INCREMENT,
    answer INT,
    question_id INT,
    employee_id INT,
    FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE SET NULL,
);