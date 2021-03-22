-- drop tables if exists


DROP TABLE IF EXISTS gov_response;
DROP TABLE IF EXISTS world_covid_data;
DROP TABLE IF EXISTS world_happiness;
DROP TABLE IF EXISTS un_govt ;


CREATE TABLE un_govt (
	id INT PRIMARY KEY ,
    country VARCHAR NOT NULL,
	population_2020 INT NOT NULL,
    head_of_state VARCHAR NOT NULL,
	constitutional_form VARCHAR NOT NULL,
    basis_of_executive_legitimacy VARCHAR NOT NULL
);


CREATE TABLE gov_response (
	response_id INT PRIMARY KEY,
	country_id INT ,
	FOREIGN KEY (country_id)REFERENCES un_govt(id),
    gov_resp_date DATE   NOT NULL,
    gov_resp_desc VARCHAR   NOT NULL,
	enforcer VARCHAR NOT NULL,
    gov_resp_type VARCHAR   NOT NULL,
    gov_resp_link_src VARCHAR   NOT NULL
);

CREATE TABLE world_happiness (
    country_id INT PRIMARY KEY,
	FOREIGN KEY (country_id) REFERENCES un_govt(id),
	year_2020 DATE NOT NULL,
    world_region VARCHAR NOT NULL,
	gdp_per_capita FLOAT NOT NULL,
	happiness_score FLOAT NOT NULL,
    social_support FLOAT NOT NULL,
    healthy_life_expectancy FLOAT   NOT NULL,
    freedom_of_choice FLOAT   NOT NULL,
    generosity FLOAT   NOT NULL,
    perceptions_of_corruption FLOAT NOT NULL

);

CREATE TABLE world_covid_data (
	covid_cases_id INT PRIMARY KEY,
	country_id INT,
	FOREIGN KEY (country_id) REFERENCES un_govt(id),
    date DATE NOT NULL,
    new_cases INT,
    new_deaths INT,
	extreme_poverty INT, 
	handwashing_facilities INT,
	covid_times_life_expectancy INT
);

-- Select * from world_happiness;

-- select un_govt.id from un_govt;

-- Alter table world_happiness add column year INT;

-- Select * from world_happiness;

-- Update world_happiness set year = 2020;
