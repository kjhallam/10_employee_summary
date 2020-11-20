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
        message: "What is your ID?",
        name: "id",
    },
    {
        type: 'input',
        message: "What is your email?",
        name: "email",
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
        message: "What is manager's ID?",
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
        return inquirer.prompt(managerQuestions)
        .then(response => {
            const fileName = outputPath;
            let manager = new Manager(response.mgrName, response.mgrId, response.mgrEmail, response.mgrOffice, response.mgrTeamMember)
            //console.log('EMPLOYEE ARRAY--> ', employeeArr);
             employeeArr.push(manager);
            askRole();
            return;
        })
        .catch(err => {
            console.log(err)
        })
    }

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
        ).then(response => {
            const data = response;
            if (data.addTeamMember !== "No Additional Team Members.") {
                switch (data.addTeamMember) {
                    case "Intern":
                        return inquirer.prompt(
                    //console.log('INTERN SECTION')
                     [ ...employeeQuestions,  
                        {
                        type: 'input',
                        message: "Where does intern attend school?",
                        name: "school",
                        }
                    ]).then(responseInt => {
                        const data = responseInt;
                        //console.log(data)
                        let intern = new Intern(data.name, data.id, data.email, data.school);
                        employeeArr.push(intern);
                        //console.log(intern);
                        askRole();
                    })
                    .catch(err => {
                        console.log(err.message);
                         askRole();
                         return;
                    })
                case "Engineer": 
                    // console.log('WE ARE IN THE ENGINEER CASE')
                    return inquirer.prompt(
                        [...employeeQuestions,
                        {
                                type: 'input',
                                message: "What is your GitHub username?",
                                name: "github",
                        }
                    ]).then(responseEng => {
                        const data = responseEng;
                        let engineer = new Engineer(data.name, data.id, data.email, data.github);
                        employeeArr.push(engineer);
                        //console.log(employeeArr)
                        askRole();   
                    }).catch(err => {
                        console.log(err.message);
                        askRole();
                        return;
                    
                    })
                }
            } else {
                const renderHTML = render(employeeArr);
                console.log(renderHTML);
                writeToFile("team.html", renderHTML);
            }
        });
        
    }
       
    askManager();
}
    
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err)=> {
        if(err) {
            console.error(err)
        }
        console.log("Success")
    })
}
getEmployee();

