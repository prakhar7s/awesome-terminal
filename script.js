// DOM Element
const input = document.querySelector(".inputCommand");
const commandEntered = document.querySelector(".commandEntered");
const inputContainer = document.querySelector(".inputContainer");
const terminalMainSection = document.querySelector(".terminalMainSection");
const lastLogin = document.querySelector(".terminalLastLogin");
const crossButton = document.querySelector(".crossButton");
const terminalHeading = document.querySelector(".terminalHeading");
const terminal = document.querySelector(".terminal");
const thankyouMessage = document.querySelector(".thankyouMessage");
const allCommandsContainer = document.querySelector(".allCommandsContainer");

// Input Value
var inputFromUser = "";

// Focus on input
input.focus();

// EVENT LISTENERS

// Set inputFromUser
input.addEventListener("input", (e) => {
  inputFromUser = e.target.value.trim();
});

// Listen for enter from user
commandEntered.addEventListener("click", (e) => {
  e.preventDefault();
  input.value = "";
  createCommandOutput();
  inputFromUser = "";

  terminal.scrollTop = terminal.scrollHeight;
});

crossButton.addEventListener("click", () => {
  terminalHeading.style.cssText = "display: none";
  terminal.style.cssText = "display: none";
  thankyouMessage.style.cssText = "display: flex";
});

// Set last login
lastLogin.innerHTML = `Last login: ${new Date().toString().substring(0, 24)}`;
// FUNCTIONS

// Trigger when user hit ENTER
function createCommandOutput() {
  const topWrapper = createElementWithClassName("div", "topWrapper");
  const inputElement = createElementWithClassName("div", "inputElement");
  const angleBracket = createElementWithClassName("span", "angleBracket");
  angleBracket.innerHTML = "&rarr;";
  const tilde = createElementWithClassName("span", "tilde");
  tilde.innerHTML = "~$";
  const h3 = createElementWithClassName("h3", "inputValue");
  h3.innerHTML = inputFromUser;

  const outputWrapper = createElementWithClassName("div", "outputWrapper");
  const output = createElementWithClassName("p", "output");
  output.innerHTML = validateInput();

  topWrapper.appendChild(angleBracket);
  topWrapper.appendChild(tilde);
  topWrapper.appendChild(h3);
  outputWrapper.appendChild(output);
  inputElement.appendChild(topWrapper);
  inputElement.appendChild(outputWrapper);

  if (!(inputFromUser == "clear")) {
    allCommandsContainer.appendChild(inputElement);
  }
}

function createElementWithClassName(elementName, className) {
  const element = document.createElement(elementName);
  element.classList.add(className);
  return element;
}

function getTodayDateInString() {
  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObj = new Date();
  const date = dateObj.getDate();
  const day = dayNames[dateObj.getDay() - 1];
  const month = monthsName[dateObj.getMonth()];
  const year = dateObj.getUTCFullYear();

  return `${day},  ${month} ${date}  ${year}`;
}

function getCurrentTimeInString() {
  return `${new Date()
    .toLocaleTimeString()
    .toString()
    .replaceAll(":", " : ")} IST`;
}

function clearTheTerminal() {
  allCommandsContainer.innerHTML = "";
}

function getHelp() {
  return `<div id="helpContainer">
             <h2 id="helpWelcomeMessage">Welcome to Awesome terminal.</h2>
             <p id="littleAboutCommands">Currently it has 4 commands:</p>
             <div id="commandsInformationContainer">
               <div id="indiCmdInfo">
                  <h3 id="commandName">date</h3>
                  <p id="aboutCommand">date command is used to display the system date.</p>
               </div>
               <div id="indiCmdInfo">
                 <h3 id="commandName">time</h3>
                 <p id="aboutCommand">date command is used to display the system time.</p>
               </div>
              <div id="indiCmdInfo">
                <h3 id="commandName">echo</h3>
                 <p id="aboutCommand">echo command in linux is used to display line of text/string that are passed as an argument.</p>
              </div>
             <div id="indiCmdInfo">
                <h3 id="commandName">clear</h3>
                 <p id="aboutCommand">clear command is used to clear the terminal screen</p>
              </div>
             </div>
          <div>`;
}

// Validation of input
function validateInput() {
  switch (inputFromUser) {
    case "date":
      return getTodayDateInString();
    case "time":
      return getCurrentTimeInString();
    case "clear":
      return clearTheTerminal();
    case "help":
      return getHelp();
    default:
      if (inputFromUser.startsWith("echo")) {
        return inputFromUser.split('"')[-1];
      }
      return "Command not found :(";
  }
}
