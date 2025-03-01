--
-- Views
--

-- Skapa vyn exempel
-- CREATE VIEW v_namn_alder
-- AS
-- SELECT
--     CONCAT(fornamn, ' ', efternamn, ' (', LOWER(avdelning), ')') AS namn,
--     TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS alder
-- FROM larare;

-- -- Använd vyn
-- SELECT * FROM v_namn_alder;

-- Radera vyn med DROP VIEW, vill du ändra en befintlig vy kan du använda ALTER VIEW.

-- Skapa en vy “v_larare” som innehåller samtliga kolumner från tabellen Lärare inklusive en ny 
-- kolumn med lärarens ålder.

DROP VIEW IF EXISTS v_larare;

CREATE VIEW v_larare AS
SELECT *, TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS ålder
FROM larare
;
-- Gör en SELECT-sats mot vyn som beräknar medelåldern på respektive avdelning. 
-- Visa avdelningens namn och medelålder sorterad på medelåldern.
SELECT avdelning, 
    ROUND(AVG(ålder)) AS Snittalder
FROM v_larare
GROUP BY avdelning
ORDER BY Snittalder DESC
;
