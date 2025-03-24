/**
 * Show teachers and their departments.
 */
"use strict";

const mysql  = require("promise-mysql");
const config = require("./config.json");

/**
 * Main function.
 * @async
 * @returns void
 */
async function getSalary() {
    const db = await mysql.createConnection(config);
    let sql;
    let res;

    sql = `
        SELECT 
            akronym, fornamn, efternamn, pre, nu, diff,
            proc,
            mini
        FROM v_lonerevision
        ORDER BY proc DESC;
    `;
    res = await db.query(sql);


    // Output as formatted text in table
    let str;

    str  = "+-----------+---------------------+-----------+--------+---------+------------+-----+\n";
    str += "| Akronym   | Namn                | Lön före  | Lön nu |  Diff   |  Procent   | Min |\n";
    str += "+-----------|---------------------|-----------|--------|---------|------------|-----+\n";
    for (const row of res) {
        str += "| ";
        str += row.akronym.padEnd(10);
        str += "| ";
        str += (row.fornamn + " " + row.efternamn).padEnd(20);
        str += "| ";
        str += row.pre.toString().padEnd(10);
        str += "| ";
        str += row.nu.toString().padEnd(6);
        str += " |";
        str += row.diff.toString().padStart(8);
        str += " |";
        str += row.proc.toString().padStart(11);
        str += " |";
        str += row.mini.toString().padStart(4);
        str += " |\n";
    }
    str += "+-----------|---------------------|-----------|--------|---------|------------|-----+\n";
    console.info(str);

    db.end();
};

module.exports = getSalary;

//temp developing
// getSalary().catch((error) => {
//     console.error("Ett fel inträffade:", error.message);
// });
