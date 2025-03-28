/**
 * Show teachers and their departments by search string.
 */
"use strict";

const mysql = require("promise-mysql");
const config = require("./config.json");

/**
 * Uppdaterar lön och hämtar den uppdaterade raden från databasen.
 *
 * @async
 * @param {string} acronym Akronym för läraren.
 * @param {number} salary  Ny lön att sätta.
 */
async function updateSalary(acronym, salary) {
    const db = await mysql.createConnection(config);

    try {
        // SQL för att uppdatera lönen
        const updateSql = `
            UPDATE larare
            SET lon = ?
            WHERE akronym = ?;
        `;
        // SQL för att hämta den uppdaterade raden
        const selectSql = `
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
            WHERE akronym = ?;
        `;

        // Uppdatera
        const updateRes = await db.query(updateSql, [salary, acronym]);

        //console.log("Resultat av UPDATE:", updateRes);

        // Kontrollera om uppdateringen påverkade någon rad
        if (updateRes.affectedRows > 0) {
            const selectRes = await db.query(selectSql, [acronym]);

            // Formatera och skriv ut den uppdaterade raden
            let str = `
+-----------+---------------------+-----------+------+--------+------------+-----------+
| Akronym   | Namn                | Avdelning | Kön  |  Lön   |     Född   | Kompetens |
+-----------+---------------------+-----------+------+--------+------------+-----------+
`;

            for (const row of selectRes) {
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
        } else {
            console.log(`Ingen rad uppdaterades. Kontrollera att akronymen '${acronym}' finns.`);
        }
    } catch (error) {
        console.error("Ett fel inträffade:", error.message);
    } finally {
        // Stäng databasanslutningen
        db.end();
    }
}

// Exportera funktionen för användning i andra moduler
module.exports = updateSalary;

// Temp utveckling: Anropa funktionen för test
// updateSalary("hoc", 10000).catch((error) => {
//     console.error("Ett fel inträffade:", error.message);
// });
