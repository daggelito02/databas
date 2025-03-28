/**
 * Hogwarts databas CLI.
 */
"use strict";

// Read from commandline
const readline = require("readline");

// Import som module functions
const getTeachers = require('./src/teachers');
const getCompetence = require('./src/competence');
const getSalary = require('./src/salary');
const searchTeachers = require('./src/search');
const updateSalary = require('./src/updateSalary');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    switch (true) { // To match different conditions
        case line === "quit":
        case line === "exit":
            //process.exit();
            exitProgram();
            break;
        case line === "help":
        case line === "meny":
            showMenu();
            break;
        case line === "larare":
            try {
                console.log("Hämtar information om våra lärare ...");
                await getTeachers();
            } catch (error) {
                console.error("Ett fel inträffade:", error.message);
            }
            break;
        case line === "kompetens":
            try {
                console.log("Hämtar information lärarnas kompetens ...");
                await getCompetence();
            } catch (error) {
                console.error("Ett fel inträffade:", error.message);
            }
            break;
        case line === "lon":
            try {
                console.log("Hämtar information lärarnas löneutveckling ...");
                await getSalary();
            } catch (error) {
                console.error("Ett fel inträffade:", error.message);
            }
            break;
        case line.startsWith("sok "): // Matches the menue word from the variable line
            {
                // Createing a search string frim variable line by removing menu word
                let searchString = line.slice(4).trim();

                if (searchString) {
                    try {
                        console.log(`Söker efter: ${searchString}`);
                        //passing the search string it forward
                        await searchTeachers(searchString);
                    } catch (error) {
                        console.error("Ett fel inträffade vid sökningen:", error.message);
                    }
                }
            }
            break;
        case line.startsWith("nylon "): // Matches the menue word from the variable line
            {
                // Skär bort "nylon " och dela upp på mellanslag
                let parts = line.slice(6).trim().split(" ");

                if (parts.length === 2) {
                    let acronym = parts[0]; // Första delen är akronym
                    let salary = parts[1]; // Andra delen är lönen

                    //console.log(`Akronym: ${akronym}, Lön: ${lon}`);

                    // Här kan du köra en funktion som använder akronym och lon
                    await updateSalary(acronym, salary);
                } else {
                    console.error("Ogiltig syntax. Använd: nylon <akronym> <lon>");
                }
            }
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
        + `  * exit, quit, ctrl-d - för att avsluta programmet.\n`
        + `  * help, meny            - visar menyval.\n`
        + `  * larare                - som visar all information om lärare mm.\n`
        + `  * kompetens             - visar en rapport hur kompetensen ändrats\n`
        + `   i senaste lönerevisionen.\n`
        + `  * lon                   - visar en rapport hur lönen ändrats\n`
        + `  i senaste lönerevisionen.\n`
        + `  * sok <valfritt sökord> - som söker bland all information hos läraren och visar \n`
        + `  de lärare som matchar söksträngen.\n`
        + `  * nylon <akronym> <lon> - som tar argumenten för lärarens akronym samt\n`
        + `  den nya lönen och uppdaterar lärarens lön.\n\n`
        + ` Övriga kommandon hanteras ej.\n`
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
    console.info("\nOrdet \"" + line + " inns inte i menyn!\n");
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

    console.info(
        "\n\nProgrammet \"Hogwarts databas\" har avslutats.\n" +
        "Välkommen tillbaka i en snar framtid :-)\n"
    );
    process.exit(code);
}
