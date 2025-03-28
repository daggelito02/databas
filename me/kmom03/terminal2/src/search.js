/**
 * Show teachers and their departments by search string.
 */
"use strict";

const mysql  = require("promise-mysql");
const config = require("./config.json");

/**
 * Main function.
 *
 * @async
 * @returns void
 *
 */

async function searchTeachers(search) {
    const db = await mysql.createConnection(config);
    let sql;
    let res;
    let like = `%${search}%`;

    sql = `
        SELECT
            akronym,
            fornamn,
            efternamn,
            avdelning,
            lon,
            kon,
            DATE_FORMAT(fodd, '%Y-%m-%d') AS born_date,
            kompetens
        FROM larare
        WHERE
            akronym LIKE ?
            OR fornamn LIKE ?
            OR efternamn LIKE ?
            OR avdelning LIKE ?
            OR kon LIKE ?
            OR DATE_FORMAT(fodd, '%Y-%m-%d') LIKE ?
            OR kompetens LIKE ?
            OR (lon = ? OR lon LIKE ?)
        ORDER BY akronym;
    `;
    res = await db.query(sql, [like, like, like, like, like, like, like, search, like]);

    // Output as formatted text in table
    let str;

    str = `
+-----------+---------------------+-----------+------+--------+------------+-----------+
| Akronym   | Namn                | Avdelning | Kön  |  Lön   |     Född   | Kompetens |
+-----------|---------------------|-----------|------|--------|------------|-----------+
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
        str += " |\n";
    }
    str += "+-----------|---------------------|-----------|------";
    str += "|--------|------------|-----------+";
    console.info(str);

    db.end();
}

module.exports = searchTeachers;

// temp developing
// searchTeachers("7").catch((error) => {
//     console.error("Ett fel inträffade:", error.message);
// });
