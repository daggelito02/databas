--
-- Copy table
--

-- source create-database.sql;

-- use skolan;

-- source ddl-larare.sql
-- source insert-larare.sql
-- source ddl-alter.sql
-- source dml-update.sql

-- SELECT
--     SUM(lon) AS 'Lönesumma',
--     SUM(kompetens) AS Kompetens
-- FROM larare;

--
-- Make copy of table
--
DROP TABLE IF EXISTS larare_pre;
CREATE TABLE larare_pre LIKE larare;
INSERT INTO larare_pre SELECT * FROM larare;

-- Check the content of the tables, for sanity checking
SELECT SUM(lon) AS 'Lönesumma', SUM(kompetens) AS Kompetens FROM larare;
SELECT SUM(lon) AS 'Lönesumma', SUM(kompetens) AS Kompetens FROM larare_pre;

-- source dml-update-lonerevision.sql

-- Visa de lärare som inte har fått en löneökning om minst 3%.

-- Gör en rapport som visar hur många % respektive lärare fick i löneökning.
