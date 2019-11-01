const mysql = require('mysql');

// connection object
let connection = null;

module.exports = {
    connection: function () {
        if (connection) return connection;
        connection = mysql.createConnection({
            host: process.env.MYSQL_HOST || 'db',
            user: process.env.MYSQL_USER || 'nemanja',
            password: process.env.MYSQL_PASSWORD || 'password',
            database: process.env.MYSQL_DB || 'defaultanswerdb'
        });
        return connection;
    }(),
};