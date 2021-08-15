class Car {
    constructor({id, name, age, brand}){
        this.id = parseInt(id) 
        this.name = name
        this.age = parseInt(age)
        this.brand = brand
    }
}

module.exports = Car