/**
 * The functions handleInput() calls
 */

"use strict";

/**
 * Show the menu on that of actions.
 *
 * @returns {void}
 */
function showMenu() {
    console.info(
        ` \n I menyn finns dessa kommandon att välja från.\n\n`
        + `  * exit, quit, ctrl-d    - för att avsluta programmet.\n`
        + `  * help, meny            - visar menyval.\n`
        + `  * larare                - som visar all information om lärare mm.\n`
        + `  * kompetens             - visar en rapport hur kompetensen ändrats i\n`
        + `    senaste lönerevisionen.\n`
        + `  * lon                   - visar en rapport hur lönen ändrats i\n`
        + `    senaste lönerevisionen.\n`
        + `  * sok <valfritt sökord> - som söker bland all information hos läraren och visar \n`
        + `    de lärare som matchar söksträngen.\n`
        + `  * nylon <akronym> <lon> - som tar argumenten för lärarens akronym samt\n`
        + `    den nya lönen och uppdaterar lärarens lön.\n\n`
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

module.exports = { showMenu, otherInputs, exitProgram };
