'use strict';

var PgTestUtil  = require('pg-test-util');
var path        = require('path');

var db = 'pg-generator-test-7348G63';

var dbOptions = {
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    defaultDatabase: db
};

var pgUtil = new PgTestUtil(dbOptions);

var createDB = function createDB(code) {
    return pgUtil.createDB(db, { drop: false })
        .then(() => { return pgUtil.executeSQLFile(path.join(__dirname, `db-${code}.sql`)); })
        .then(() => { return pgUtil.executeSQLFile(path.join(__dirname, `data-${code}.sql`)); })
        .catch((err) => { console.log(err); });
};

var dropDB = function dropDB() {
    return pgUtil.dropDB(db);
};

module.exports = {
    createDB: createDB,
    dropDB: dropDB,
    credentials: { database: db, user: dbOptions.user, password: dbOptions.password, host: dbOptions.host, port: dbOptions.port }
};
