/**
 * Hogwarts databas CLI.
 */
"use strict";

// Read from commandline
const readline = require("readline");

// Import som module functions
const handleInput = require('./src/handleInput.js');
const { exitProgram } = require('./src/helperFunctions.js');

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
    rl.on("line", (line) => {
        handleInput(line, rl); // Send `rl` as argument.
    });

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
