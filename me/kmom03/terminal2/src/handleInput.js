
/**
 * Handle input as a command and send it to a function that deals with it.
 */

"use strict";

// Import som module functions
const { showMenu, otherInputs, exitProgram } = require('./helperFunctions.js');
const getTeachers = require('./teachers');
const getCompetence = require('./competence');
const getSalary = require('./salary');
const searchTeachers = require('./search');
const updateSalary = require('./updateSalary');

/**
 * Handle input function
 *
 * @param {string} line The input from the user.
 *
 */

async function handleInput(line, rl) {
    line = line.trim();
    switch (true) { // To match different conditions
        case line === "quit":
        case line === "exit":
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
                console.error("Hämtningen av lärare gick fel:", error.message);
            }
            break;
        case line === "kompetens":
            try {
                console.log("Hämtar information lärarnas kompetens ...");
                await getCompetence();
            } catch (error) {
                console.error("Hämtningen av kompetensen gick fel:", error.message);
            }
            break;
        case line === "lon":
            try {
                console.log("Hämtningen information lärarnas löneutveckling ...");
                await getSalary();
            } catch (error) {
                console.error("Hämtningen av löneutveckling gick fel:", error.message);
            }
            break;
        case line.startsWith("sok "): // Matches the menue word from the variable line
            {
                // Createing a search string from variable line by removing menu word
                let searchString = line.slice(4).trim();

                if (searchString) {
                    try {
                        console.log(`Söker efter: ${searchString}`);
                        //sends the search string forward
                        await searchTeachers(searchString);
                    } catch (error) {
                        console.error("Ett fel inträffade vid sökningen:", error.message);
                    }
                }
            }
            break;
        case line.startsWith("nylon "): // Matches the menue word from the variable line
            {
                // Createing a search strings from variable line by removing menu word
                let parts = line.slice(6).trim().split(" ");

                if (parts.length === 2) {
                    let acronym = parts[0]; // First search word akronym
                    let salary = parts[1]; // Second word are the salery number
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

module.exports = handleInput;
