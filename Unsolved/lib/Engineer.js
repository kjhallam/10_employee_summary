// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Engineer extends Employee {
   constructor(stuffToGiveToParentClass,whatever){
       super(stuffToGiveToParentClass)
       this.whatever = whatever;
   }
}

module.exports = Engineer;