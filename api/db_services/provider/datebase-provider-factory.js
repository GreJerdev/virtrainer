"use strict";


let mysql_provider = null;//require('./mysql_provider');
const configuration = require('../../configuration/config');
const trainingMongoDBProvider = require('./mongo/training-mongo-provider');
const exerciseMongoDBProvider = require('./mongo/exercise-mongo-provider');
const userMongoDBProvider = require('./mongo/user-mongo-provider');

module.exports = function (object_name) {
        switch (configuration.db.use) {
            case 'mongodb':
                return getMongoDBProvider(object_name);
                break;
            case 'mysql':
                return mysql_provider;
                break;
            default:
                return custom_db_provider;
                break;
        }

    function getMongoDBProvider(object_name){
            switch (object_name) {
                case '':
                    break;
                case 'training':
                    return new trainingMongoDBProvider();
                    break;
                case 'exercise':
                    return new exerciseMongoDBProvider();
                    break;
                case 'user':
                    return new userMongoDBProvider();
                    break;

            }
    }


};