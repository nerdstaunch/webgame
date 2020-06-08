class User {

    constructor(id) {
        this.id = id;
    }

    sayName() {
        console.log("user ->", this.id);
    }



}

module.exports = User;