const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr = [];


const employeeQuestions = [
    {
        type: 'input',
        message: "What is your name?",
        name: "name",
    },
    {
        type: 'input',
        message: "What is your ID",
        name: "id",
    },
    {
        type: 'input',
        message: "What is your email?",
        name: "email",
    },
    {
        type: 'list',
        message: "What is your role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern", "No Additional Team Members."]
    },
]

const managerQuestions = [
    {
        type: 'input',
        message: "What is manager's name?",
        name: "mgrName",
    },
    {
        type: 'input',
        message: "What is manager's ID",
        name: "mgrId",
    },
    {
        type: 'input',
        message: "What is manager's email?",
        name: "mgrEmail",
    },
    {
        type: 'input',
        message: "What is manager's office number?",
        name: "mgrOffice",
    },
]


function getEmployee() {
    const askManager = () => {
        return inquirer.prompt
        (managerQuestions)
        .then((response) => {
            const fileName = outputPath;
            let manager = null;

        try {
            manager = new Manager(response.mgrName, response.mgrId, response.mgrEmail, response.mgrOffice, response.mgrTeamMember)
        }
        catch (err) {
            console.log(err.message);
            askManager();
            return;
        }
        employeeArr.push(manager);

    const askRole = () => {
        return inquirer.prompt(
            [
            {
                type: 'list',
                message: "Which type of team member would you like to add?",
                name: "addTeamMember",
                choices: ["Engineer", "Intern", "No Additional Team Members."]
            }
            ]      
        )
        .then((responseType) => {
            const data = responseType;
            if (responseType.addTeamMember != "Close") {
                switch (responseType.employeeQuestions) {
                    case "Intern":
                    inquirer.prompt(
                    [
                        employeeQuestions.name, employeeQuestions.id, employeeQuestions.email,
                        [
                            {
                            type: 'input',
                            message: "Where does intern attend school?",
                            name: "school",
                            }
                        ]
                    
                    ])
                    .then((responseInt) => {
                        const data = responseInt;
                        let intern = null;
                        try { intern = new Intern(data.name, data.id, data.email, data.school);
                            functionType(intern);
                        }
                    catch (err) {
                        console.log(err.message);

                        askRole();

                        return;
                    }
                    });
                    break;
                case "Engineer": inquirer.prompt(
                    [
                        employeeQuestions.name, employeeQuestions.id,
                        employeeQuestions.email,
                        {
                                type: 'input',
                                message: "What is your GitHub username",
                                name: "github",
                        }
                    ])
                        .then((responseEng) => {
                            const data = responseEng;
                            let engineer = null;
                        
                        try { 
                            engineer = new Engineer(data.name, data.id, data.email, data.github);
                        functionType(engineer);
                        }
                        catch (err) {
                          console.log(err.message);
                          askRole();
                          return;
                        }
                        });
                        break;
                        default: console.log(`Incomplete Employee Role: ${responseType.role}`);
                        throw new Err("Team Completed. Enter CTRL+C");
                        break;
                    }
                } else {
                    const renderedHTML = render(employeeArr);
                    writeToFile(filename, renderHTML);
                }
            });
    }
        const functionType = (data) => {
            employeeArr.push(data);
            askRole();
        }

        askRole();

        });
    }

        }
    askManager();


    
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) 
    => {
        if(err) throw err
        console.log("Success")
    })
}
getEmployee();


    