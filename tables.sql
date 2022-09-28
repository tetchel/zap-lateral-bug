CREATE TABLE parent_table (id SERIAL PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE child_table (id SERIAL PRIMARY KEY, parent_id INT NOT NULL REFERENCES parent_table(id), child_value TEXT NOT NULL);

INSERT INTO parent_table (value) VALUES ('first');
INSERT INTO parent_table (value) VALUES ('second');
INSERT INTO child_table (parent_id, child_value) VALUES (1, 'child value')
