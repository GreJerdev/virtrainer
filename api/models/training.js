'use strict';

module.exports = {
    create: function (training) {
        let new_training = {
            id : "",
            name: "",
            description: "",
            exercises: []
        }
        if (!training) {
            return new_training; 
        }

        new_training.id =training.id;
        new_training.name =training.name;
        new_training.description = training.description;
        new_training.exercises =training.exercises 
        return new_training;
    },
    parseToResponse:(training)=>{
        return training;
    }
}