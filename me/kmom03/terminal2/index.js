/**
 * Hogwarts databas CLI.
 */
"use strict";

// Read from commandline
const readline = require("readline");
// Import som module functions 
const getTeachers = require('./src/teachers'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// // Promisify rl.question to question
// const util = require("util");
//
// rl.question[util.promisify.custom] = (arg) => {
//     return new Promise((resolve) => {
//         rl.question(arg, resolve);
//     });
// };
// const question = util.promisify(rl.question);

// Import modules
//const getTeachers = require('./src/teachers'); 

// (async () => {
//     try {
//         await getTeachers(); // Kör main-funktionen
//     } catch (err) {
//         console.error("Ett fel inträffade:", err.message);
//     }
// })();



/**
 * Main function.
 *
 * @returns void
 */
(function() {
    rl.on("close", exitProgram);
    rl.on("line", handleInput);

    //game.init();
    console.log(
        "\n"
        + "Välkommen till programmet \"Hogwarts databas\"!\n\n"
        + "Här kan du söka i skolans databas!\n"
        + "Söka tillexempel lärarinformation så som,\n"
        + "lön, kompetens nylön med mera\n"
        + "Välj 'meny' för mer info eller 'exit' för att avsluta.\n"
    );

    rl.setPrompt("Skriv in ett sökord/kommando eller kolla menyalternativen: ");
    rl.prompt();
})();



/**
 * Handle input as a command and send it to a function that deals with it.
 *
 * @param {string} line The input from the user.
 *
 */
async function handleInput(line) {
    line = line.trim();
    switch (line) {
        case "quit":
        case "exit":
            //process.exit();
            exitProgram();
            break;
        case "help":
        case "meny":
            showMenu();
            break;
        case "larare":
            try {
                console.log("Hämtar information om våra lärare ...");
                await getTeachers();
            } catch (error) {
                console.error("Ett fel inträffade:", error.message);
            }
            break;
        case "kompetens":
            searchCompetence();
            break;
        case "lon":
            searchSalary();
            break;
        case "sok <sokstrang>":
            searchString();
            break;         
        case "nylon <akronym> <lon>":
            searchNewSalaryByeAkronym();
            break;
        default:
            otherInputs(line);
    }

    rl.prompt();
}


/**
 * Show the menu on that can be done.
 *
 * @returns {void}
 */
function showMenu() {
    console.info(
        ` \n I menyn finns dessa kommandon att välja från.\n\n`
        + `  exit, quit, ctrl-d - för att avsluta programmet.\n`
        + `  help, meny - visar menyval.\n`
        + `  larare - som visar all information om lärare mm.\n`
        + `  kompetens - visar en rapport hur kompetensen ändrats i senaste lönerevisionen.\n`
        + `  lon - visar en rapport hur kompetensen ändrats i senaste lönerevisionen.\n`
        + `  sok <sokstrang> - visar en rapport hur kompetensen ändrats i senaste lönerevisionen.\n`
        + `  nylon <akronym> <lon> - visar en rapport hur kompetensen ändrats i senaste lönerevisionen.\n`
        + `  övriga kommandon hanteras ej.\n`
    );
}


/**
 * Default case handel all other words.
 *
 * @param {string} line A random word
 * 
 * @returns {void}
 */
function otherInputs(line) {
    console.info("\nOrdet \"" + line + "\ finns inte i menyn!\n");
}

/**
 * Guess the number and check if its correct.
 *
 * @param {number} guess The number being guessed.
 *
 * @returns {void}
 */
// function makeGuess(guess) {
//     guess = Number.parseInt(guess);

//     if (game.check(guess)) {
//         console.info(` Congratulations! You guessed the number I thought of.`);
//         return;
//     }

//     console.info(` Wrong! The number is ${game.compare(guess)}.`);
// }


/**
 * Close down program and exit with a status code.
 *
 * @param {number} code Exit with this value, defaults to 0.
 *
 * @returns {void}
 */
function exitProgram(code) {
    code = code || 0;

    console.info("\n\nProgrammet \"Hogwarts databas\" har avslutats.\nVälkommen tillbaka i en snar framtid :-)\n");
    process.exit(code);
}
