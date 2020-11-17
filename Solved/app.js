const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const promptQuestions = () =>{
    return inquirer.prompt(questions)
}

const questions = [
    {
        type: 'input',
        message: "What is manager's name?",
        name: "name",
    },
    {
        type: 'input',
        message: "What is manager's ID",
        name: "id",
    },
    {
        type: 'input',
        message: "What is manager's email?",
        name: "email",
    },
    {
        type: 'input',
        message: "What is manager's office number?",
        name: "office",
    },
    {
        type: 'list',
        message: "What type of team member would you like on your team?",
        name: "team",
        choices: ["Engineer", "Intern", "No additional team members"],
    },
        // for loop to add additional team members.
        //if engineer is selected in the choices --> then it prompts for a GitHub username.
        //if intern is selected enter school name.
        // once all team members are selected then a OUTPUT FOLDER is created with a team.html file is rendered.
        {if(team = Engineer){
        [
            {
            type: 'input',
            message: "What is your GitHub username",
            name: "github",
            },
        ]
        }, else (team = Intern) {
        [
            {
            type: 'input',
            message: "Where do you attend school?",
            name: "school",
            },
        ]
    },
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) 
    => {
        if(err) throw err
        console.log("Success")
    })
}

function renderHTML () {
    promptQuestions().then(data => {
        axios.get('https://api.github.com/')
    })
}


    // Write code to use inquirer to gather information about the development team members,
    // and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```