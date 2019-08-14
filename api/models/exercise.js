'use strict';

const BaseModel = require('./base_model');

module.exports = class Exercise extends BaseModel {


    constructor(exercise) {
        super(exercise);
        this.id = "";
        this.name = "";
        this.description = "";
        this.youtupe_link = "";
        this.exercise_duration = 0;
        this.number_of_repetitions = 0;

        if (exercise) {
            this.id = exercise.id;
            this.name = exercise.name;
            this.description = exercise.description;
            this.youtupe_link = exercise.youtupe_link;
            this.exercise_duration = exercise.exercise_duration;
            this.number_of_repetitions = exercise.number_of_repetitions;
        }
    }

    parseToResponse(exercise){
        return exercise;
    }
}