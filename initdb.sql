/* Ensures creation of database 'defaultanswerdb' and table 'default_answer' */
CREATE DATABASE defaultanswerdb;

USE defaultanswerdb;

CREATE TABLE IF NOT EXISTS default_answer(
                     id VARCHAR(255) NOT NULL,
                     advertId INT NOT NULL,
                     type ENUM ('NO_ANSWER', 'DEFAULT', 'VIEWING_FIX', 'VIEWING_CONTACT') DEFAULT 'NO_ANSWER',
                     message TEXT);
