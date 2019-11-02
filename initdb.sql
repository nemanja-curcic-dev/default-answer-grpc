/* Ensures creation of database 'defaultanswerdb' and table 'default_answer' */
CREATE DATABASE defaultanswerdb;

USE defaultanswerdb;

CREATE TABLE IF NOT EXISTS default_answer(
                     id VARCHAR(255) NOT NULL,
                     advertid INT NOT NULL,
                     type TINYINT,
                     message TEXT);
