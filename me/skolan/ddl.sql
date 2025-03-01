--
-- Create scheme for database skolan.
--
DROP TABLE IF EXISTS larare;
CREATE TABLE larare
(
    akronym CHAR(3),
    avdelning CHAR(4),
    fornamn VARCHAR(20),
    efternamn VARCHAR(20),
    kon CHAR(1),
    lon INT,
    fodd DATE,
    kompetens INT NOT NULL DEFAULT 1,

    PRIMARY KEY (akronym)
);

--
-- Uddate with ALTER
--

-- Add column "kompetens" to table
-- -- ALTER TABLE larare ADD COLUMN kompetens INT;

-- Remove column "kompetens" from table
-- ALTER TABLE larare drop COLUMN kompetens;

-- ADD column "kompetens" to table with default value 1 (DEFAULT) and no NULL values
-- ALTER TABLE larare ADD COLUMN kompetens INT NOT NULL DEFAULT 1;

--
-- Make copy of table
--
DROP TABLE IF EXISTS larare_pre;
CREATE TABLE larare_pre LIKE larare;
INSERT INTO larare_pre SELECT * FROM larare;


