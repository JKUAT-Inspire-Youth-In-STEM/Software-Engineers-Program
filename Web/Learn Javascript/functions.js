function greet(name){
    return "Hello, " +name + "!";
}

console.log(greet("Alice"))

function add(a, b = 0){
    return a + b;
}

console.log(add(5,7))
