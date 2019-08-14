'use strict';

const BaseModel = require('./base_model');

module.exports = class Training extends BaseModel {


    constructor(training) {
        super(training);
        this.id = "";
        this.name = "";
        this.description = "";
        this.exercises = [];

        if( training){
            this.id = training.id;
            this.name = training.name;
            this.description = training.description;
            this.exercises = training.exercises;
        }
    }

    parseToResponse(training) {
        return training;
    }
}