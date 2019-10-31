const mysql = require('mysql');

// export connection object
module.exports = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'db',
    user: process.env.MYSQL_USER || 'nemanja',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DB || 'defaultanswerdb'
});