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
async function getTeachers() {
    const db = await mysql.createConnection(config);
    let sql;
    let res;

    sql = `
        SELECT
            akronym,
            fornamn,
            efternamn,
            avdelning,
            kon,
            lon,
            DATE_FORMAT(fodd, '%Y-%m-%d') AS born_date,
            TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS alder,
            kompetens
        FROM larare
        ORDER BY akronym;
    `;
    res = await db.query(sql);

    // Output as formatted text in table
    let str;

    str = `
+-----------+---------------------+-----------+------+--------+------------+-----------+-------+
| Akronym   | Namn                | Avdelning | Kön  |  Lön   |     Född   | Kompetens | Ålder |
+-----------|---------------------|-----------|------|--------|------------|-----------|-------+
`;

    for (const row of res) {
        str += "| ";
        str += row.akronym.padEnd(10);
        str += "| ";
        str += (row.fornamn + " " + row.efternamn).padEnd(20);
        str += "| ";
        str += row.avdelning.padEnd(10);
        str += "| ";
        str += row.kon.padEnd(4);
        str += " |";
        str += row.lon.toString().padStart(7);
        str += " |";
        str += " " + row.born_date + "";
        str += " |";
        str += row.kompetens.toString().padStart(10);
        str += " |";
        str += row.alder.toString().padStart(6);
        str += " |\n";
    }
    str += "+-----------|---------------------|-----------|------";
    str += "|--------|------------|-----------|-------+";
    console.info(str);

    db.end();
}

module.exports = getTeachers;

// temp developing
// getTeachers().catch((error) => {
//     console.error("Ett fel inträffade:", error.message);
// });
