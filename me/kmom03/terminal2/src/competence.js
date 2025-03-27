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
async function getCompetence() {
    const db = await mysql.createConnection(config);
    let sql;
    let res;

    sql = `
        SELECT 
            akronym, fornamn, efternamn,
            pre_kompetens AS prekomp,
            nu_kompetens AS nukomp,
            kompetens_diff AS diffkomp
        FROM v_lonerevision
        ORDER BY nukomp DESC, diffkomp DESC
        ;
    `;
    res = await db.query(sql);


    // Output as formatted text in table
    let str;

    str = `
+-----------+---------------------+-----------+---------+------------+
| Akronym   | Namn                | Pre komp  | Nu komp | Diff Komp  |
+-----------|---------------------|-----------|---------|------------+
`;
    for (const row of res) {
        str += "| ";
        str += row.akronym.padEnd(10);
        str += "| ";
        str += (row.fornamn + " " + row.efternamn).padEnd(20);
        str += "| ";
        str += row.prekomp.toString().padEnd(10);
        str += "| ";
        str += row.nukomp.toString().padEnd(7);
        str += " |";
        str += row.diffkomp.toString().padStart(11);
        str += " |\n";
    }
    str += `+-----------|---------------------|-----------|---------|------------+
`;
    console.info(str);

    db.end();
}

module.exports = getCompetence;

//temp developing
// getCompetence().catch((error) => {
//     console.error("Ett fel inträffade:", error.message);
// });
