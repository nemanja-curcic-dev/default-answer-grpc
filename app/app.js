const connection = require('./db/db');
const log = require('debug-logger')('defaultanswer');

connection.connect((err) => {
    if (err) {
        throw err;
    }
});

connection.on('connect', () => {
    // app is connected to database
});

