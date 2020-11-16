// function to generate markdown for README
function generateMarkdown(answers) {
  return `
# 🔗 [${answers.projectTitle}](${answers.projectURL})

## LICENSE

${answers.licenseType === "Apache" ? "![Badge](https://img.shields.io/static/v1?label=license&message=apache&color=blue)" : 
  answers.licenseType === "Creative Commons" ? "![Badge](https://img.shields.io/badge/license-CC-orange)" : 
  answers.licenseType === "MIT" ? "![Badge](https://img.shields.io/badge/license-MIT-brightgreen)" : "None"}

---

## 📓 DESCRIPTION

${answers.describe}

---

## Table of Contents

  1. [DESCRIPTION](#description)
  2. [INSTALLATION](#installation)
  3. [USAGE](#usage)
  4. [CONTRIBUTING](#contributing)
  5. [TEST](#test)
  6. [GITHUB](#github)
  7. [QUESTIONS](#questions)
  
---

## 📓 INSTALLATION

${answers.install}

---

## 📓 USAGE

${answers.usage}

---

## 📓 CONTRIBUTING

${answers.contribute}

---

## 📓 TEST

${answers.test}

---

## :octocat: GITHUB

[${answers.githubUser}](http://github.com/${answers.githubUser})

---

## 🎥 PREVIEW

---

## 💻 QUESTIONS

If any questions concerning the use of the markdown file contact me at ✉️ [Email](${answers.email}).
`;
}

module.exports = generateMarkdown;