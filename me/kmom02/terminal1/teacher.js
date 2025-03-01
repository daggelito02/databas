/**
 * A program to fetch teschers from DB.
 *
 * @author Dag Fredriksson
 */

"use strict";

const mysql  = require("promise-mysql");
const config = require("./config.json");



/**
 * Main function.
 *
 * @async
 * @returns void
 */
(async function() {
    const db = await mysql.createConnection(config);
    let str;

    str = await viewTeachers(db);
    console.info(str);

    db.end();
})();



/**
 * Get a report with everything from the table larare, formatted as a text table.
 *
 * @async
 * @param {connection} db Database connection.
 *
 * @returns {string} Formatted table to print out.
 */
async function viewTeachers(db) {
    let sql;
    let res;
    let str;

    sql = `
        SELECT 
        *, DATE_FORMAT(fodd, '%Y-%m-%d') AS formatted_date 
        FROM larare
        ORDER BY akronym;
    `;
    res = await db.query(sql);
    str = teacherAsTable(res);
    return str;
}

/**
 * Output resultset as formatted table with details on teachers.
 *
 * @param {Array} res Resultset with details on from database query.
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
    str += "+-----------+---------------------+-----+---------+------+------------+\n";

    return str;
}
