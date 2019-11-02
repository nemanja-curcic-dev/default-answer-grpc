/* Ensures creation of database 'defaultanswerdb' and table 'default_answer' */
CREATE DATABASE IF NOT EXISTS defaultanswerdb;

USE defaultanswerdb;

CREATE TABLE IF NOT EXISTS default_answer(
                     id INT NOT NULL AUTO_INCREMENT,
                     advertid INT NOT NULL,
                     type TINYINT,
                     message TEXT,
                     PRIMARY KEY (id));
