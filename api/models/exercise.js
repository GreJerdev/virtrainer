'use strict';

'use strict';

module.exports = {
    create: function (exercise) {
        let new_exercise = {
            id: "",
            name: "",
            description: "",
            youtupe_link: "",
            exercise_duration: 0,
            number_of_repetitions: 0
        }
        if (!exercise) {
            return new_exercise;
        }

        new_exercise.id = exercise.id;
        new_exercise.name = exercise.name;
        new_exercise.description = exercise.description;
        new_exercise.youtupe_link = exercise.youtupe_link;
        new_exercise.exercise_duration = exercise.exercise_duration;
        new_exercise.number_of_repetitions = exercise.number_of_repetitions;
        return new_training;
    },
    parseToResponse: (exercise) => {
        return exercise ;
    }
}