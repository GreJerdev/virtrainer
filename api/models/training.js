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
        this.tags = [];
        if (training) {
            this.id = training.id;
            this.name = training.name;
            this.description = training.description;
            this.tags = training.tags || [];
            if (training.exercises) {
                this.exercises = training.exercises.map(exercises => new ExerciseModel(exercises));
            };
        }
    }

    parseToResponse(training) {
        return training;
    }

    static parseFromCreateRequest(training) {
        if (training){
            training.id = null;
            return Training.parseFromUpdateRequest(training);
        }
    }

    static parseFromUpdateRequest(training) {
        let return_training = new Training();
        return_training.id = training.id;
        return_training.name = training.name;
        return_training.description = training.description;
        if (training.exercises) {
            return_training.exercises = ExerciseModel.parseExerciseInputList( training.exercises.map(exercises => new ExerciseModel(exercises)));
        };
        return return_training;
    }

};