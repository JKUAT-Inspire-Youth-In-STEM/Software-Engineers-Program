const person = {
    name: "Ada Lovelace",
    age: 20,
    greet: function(){
        console.log(`Hello my name is ${this.name}`)
    }
}

// console.log(person.name);
// person.greet();
const car = {
    driveType: "FWD",
    brand: "Toyota",
    color: "Maroon",
    model: "Corolla",
    engine: "v8 Engine",
    start: function(){
        console.log(`The car ${brand} is started and running on Engine ${engine}`)
    }
}

function Person(name, age){
    this.name = name
    this.age = age

    this.greet = function(){
        console.log(`Hello my name is ${name}`)
    }
}
const Mike = new Person("Mike", 45);
Mike.greet();

co
