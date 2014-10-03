DROP TABLE categories;
DROP TABLE contacts; 

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE contacts(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  age INTEGER,
  address VARCHAR(255),
  phone_number VARCHAR(255),
  picture TEXT,
  category_id INTEGER
);
