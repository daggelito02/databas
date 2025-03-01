/**
 * A program to get teschers and filter the search with input word from keyboard.
 *
 * @author Dag Fredriksson
 */

"use strict";

const mysql  = require("promise-mysql");
const config = require("./config.json");

// Read from commandline
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/**
 * Main function.
 *
 * @async
 * @returns void
 */
(async function() {
    const db = await mysql.createConnection(config);
    let str;

    // Ask question and handle answer in async arrow function callback.
    rl.question("What to search for? ", async (search) => {
        str = await searchTeachers(db, search);
        console.info(str);

        rl.close();
        db.end();
    });
})();



/**
 * Output resultset as formatted table with details on a teacher.
 *
 * @async
 * @param {connection} db     Database connection.
 * @param {string}     search String to search for.
 *
 * @returns {string} Formatted table to print out.
 */
async function searchTeachers(db, search) {
    let sql;
    let res;
    let str;
    let like = `%${search}%`;

    console.info(`Searching for: ${search}`);

    sql = `
        SELECT 
        *, DATE_FORMAT(fodd, '%Y-%m-%d') AS formatted_date 
        FROM larare
        WHERE
            akronym LIKE ?
            OR fornamn LIKE ?
            OR efternamn LIKE ?
            OR avdelning LIKE ?
            OR lon = ?
            OR kompetens = ?
        ORDER BY akronym;
    `;
    res = await db.query(sql, [like, like, like, like, search, search]);
    str = teacherAsTable(res);
    return str;
}



/**
 * Output resultset as formatted table with details on a teacher.
 *
 * @param {RowDataPacket} res Resultset with details on a teacher.
 *
 * @returns {string} Formatted table to print out.
 */
function teacherAsTable(res) {
    let str;

    str  = "+-----------+---------------------+------+-------+------+------------+\n";
    str += "| Akronym   | Namn                | Avd  |  Lön  | Komp | Född       |\n";
    str += "|-----------|---------------------|------|-------|------|------------+\n";
    for (const row of res) {
        str += "| ";
        str += row.akronym.padEnd(10);
        str += "| ";
        str += (row.fornamn + " " + row.efternamn).padEnd(20);
        str += "| ";
        str += row.avdelning.padEnd(5);
        str += "| ";
        str += row.lon.toString().padEnd(6);
        str += "| ";
        str += row.kompetens.toString().padStart(5);
        str += "| ";
        str += row.formatted_date;
        str += " |\n";
    }
    str += "+-----------+---------------------+------+-------+------+------------+\n";

    return str;
}
