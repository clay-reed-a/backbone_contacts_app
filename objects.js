function Person (firstName, lastName, theAge, favoriteColor) {
  this.first = firstName;
  this.last = lastName;
  this.age = theAge;
  this.sayHello = function() {
    console.log("Hello, I'm " + this.first + ' ' + this.last + '!'); 
  }; 
}