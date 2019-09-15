"use strict";

let ERROR = require('../utilities/errors');
let provider_factory = require('./provider/datebase-provider-factory');
let UserModel = require('../models/user');

module.exports = class UserService {

    constructor() {
        this.db_connection = new provider_factory('user')
    }
}