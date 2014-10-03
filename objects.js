function Person (firstName, lastName, theAge, favoriteColor, living) {
  this.first = firstName;
  this.last = lastName;
  this.age = theAge;
  this.sayHello = function() {
    if (this.isAlive()) {
     console.log("Hello, I'm " + this.first + ' ' + this.last + '!'); 
    } else {
      console.log(this.last + " cannot speak. Is dead.");
    }
  }; 
  this.alive = living; 
}

Person.prototype.isAlive = function() {
  return this.alive;
}; 

var clay = new Person("Clayton", "Albachten", 26, "blue", true);
var cheryl = new Person("Cheryl", "Wu", 21, "red", true);
var turing = new Person("Alan", "Turing", 102, "gray", false);

clay.sayHello();
cheryl.sayHello();
turing.sayHello(); 