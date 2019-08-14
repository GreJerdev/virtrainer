'use strict';

const BaseModel = require('./base_model');
const ExerciseModel = require('./exercise');


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
            if(training.exercises) {
                this.exercises = training.exercises.map(exercises=> new ExerciseModel(exercises) );
            };
        }
    }

    parseToResponse(training) {
        return training;
    }
}