'use strict';

module.exports = class Training {


    constructor(training) {
        this.id = "";
        this.name = "";
        this.description = "";
        this.exercises = "";

        if( training){
        this.id = training.id;
        this.name = training.id;
        this.description = training.id;
        this.exercises = training.id;
        }
    }

    parseToResponse(training) {
        return training;
    }
}