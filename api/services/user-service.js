const UserModel = require('../models/user');
const ErrorCode = require('../utilities/errors');

let userDBProvider = require("../db_services/user-db-service");

module.exports = class UserService {

    constructor(db_provider = null) {
        this.db_provider = db_provider || new userDBProvider();
    }
}