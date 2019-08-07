let mongodb_provider = require('./mongodb_provider');
let mysql_provider = null;//require('./mysql_provider');
let configuration = require('../../configuration/config');


module.exports = function (custom_db_provider) {
        switch (configuration.db.use) {
            case 'mongodb':
                return mongodb_provider;
                break;
            case 'mysql':
                return mysql_provider;
                break;
            default:
                return custom_db_provider;
                break;
        }
};