module.exports = class User extends BaseModel {


    constructor(user) {
        super(user);
        this.id = "";
        this.name = "";
        this.data = {};
        this.trainings = [];
        this.traineres = [];
        this.trainees = [];


        if(user){
            this.id =user.id;
            this.name = user.name;
            this.data = user.data;
            this.trainings = user.trainings;
            this.traineres = user.traineres;
            this.trainees = user.trainees;
        }

    }
}