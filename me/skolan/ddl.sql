--
-- Create scheme for database skolan.
--

DROP TABLE IF EXISTS kurstillfalle;
DROP TABLE IF EXISTS kurs;
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

CREATE TABLE kurs (
    kod CHAR(6) PRIMARY KEY NOT NULL,
    namn VARCHAR(40),
    poang FLOAT,
    niva CHAR(3)
);

-- SHOW CREATE TABLE kurs \G  -- (\G) print result line by line

CREATE TABLE kurstillfalle (
    id INT AUTO_INCREMENT NOT NULL,
    kurskod CHAR(6) NOT NULL,
    kursansvarig CHAR(3) NOT NULL,
    lasperiod INT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (kurskod) REFERENCES kurs(kod),
    FOREIGN KEY (kursansvarig) REFERENCES larare(akronym)
);

-- SHOW CREATE TABLE kurstillfalle \G -- (\G) print result line by line

--
-- Make copy of table
--
DROP TABLE IF EXISTS larare_pre;
CREATE TABLE larare_pre LIKE larare;
-- INSERT INTO larare_pre SELECT * FROM larare;

--
-- Views
--

DROP VIEW IF EXISTS v_larare;

CREATE VIEW v_larare AS
SELECT *, TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS alder
FROM larare
;

SELECT avdelning, 
    ROUND(AVG(alder)) AS Snittalder
FROM v_larare
GROUP BY avdelning
ORDER BY Snittalder DESC
;

--
-- Join table
--

SELECT
    l.akronym,
    l.lon,
    l.kompetens,
    p.lon AS "pre-lon",
    p.kompetens AS "pre-kompetens"
FROM larare AS l
    JOIN larare_pre AS p
        ON l.akronym = p.akronym
ORDER BY akronym
;

DROP VIEW IF EXISTS v_lonerevision;

CREATE VIEW v_lonerevision AS
SELECT 
    l.akronym,
    l.fornamn,
    l.efternamn,
    p.lon AS pre, 
    l.lon AS nu,
    (l.lon - p.lon) AS diff,
    ROUND((l.lon - p.lon) / p.lon * 100, 2) AS proc,
    CASE 
        WHEN (l.lon - p.lon) / p.lon * 100 >= 3 THEN 'ok'
        ELSE 'nok'
    END AS mini,
    p.kompetens AS pre_kompetens,
    l.kompetens AS nu_kompetens,
    (l.kompetens - p.kompetens) AS kompetens_diff
FROM larare AS l
JOIN larare_pre AS p
ON l.akronym = p.akronym
;

SELECT 
    akronym, fornamn, efternamn, pre, nu, diff,
    proc,
    mini
FROM v_lonerevision
ORDER BY proc DESC;

-- Only look at the competence.

SELECT 
    akronym, fornamn, efternamn,
    pre_kompetens AS prekomp,
    nu_kompetens AS nukomp,
    kompetens_diff AS diffkomp
FROM v_lonerevision
ORDER BY nukomp DESC, diffkomp DESC
;


--
-- Join three tables and create a view
--

DROP VIEW IF EXISTS v_planering;

CREATE VIEW v_planering
AS
SELECT *
FROM kurs AS k
    JOIN kurstillfalle AS kt
        ON k.kod = kt.kurskod
    JOIN larare AS l
        ON l.akronym = kt.kursansvarig;


DROP VIEW IF EXISTS v_course_opportunities;

CREATE VIEW v_course_opportunities
AS
SELECT 
    l.akronym AS Akronym,
    CONCAT(l.fornamn, ' ', l.efternamn) AS Namn,
    COUNT(kt.id) AS Tillfallen
    FROM 
        larare AS l
    JOIN 
        kurstillfalle AS kt
        ON l.akronym = kt.kursansvarig
GROUP BY 
    l.akronym, l.fornamn, l.efternamn
ORDER BY 
    Tillfallen DESC, Akronym ASC;

DROP VIEW IF EXISTS v_age_of_course_leaders;

CREATE VIEW v_age_of_course_leaders
AS
SELECT 
    akronym, 
    fornamn, 
    efternamn, 
    fodd, 
    TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS Ålder
FROM 
    larare
ORDER BY 
    Ålder DESC
LIMIT 3;

DROP VIEW IF EXISTS v_age_of_course_leaders_teaches_courses;

CREATE VIEW v_age_of_course_leaders_teaches_courses AS
SELECT 
    DISTINCT CONCAT(k.namn, ' (', k.kod, ')') AS Kursnamn,
    CONCAT(l.fornamn, ' ', l.efternamn, ' (', l.akronym, ')') AS Larare,
    TIMESTAMPDIFF(YEAR, l.fodd, CURDATE()) AS Alder
FROM 
    kurstillfalle AS kt
JOIN 
    kurs AS k ON k.kod = kt.kurskod
JOIN 
    larare AS l ON l.akronym = kt.kursansvarig
JOIN (
    SELECT akronym
    FROM larare
    ORDER BY TIMESTAMPDIFF(YEAR, fodd, CURDATE()) DESC
    LIMIT 5
) AS oldest_teachers ON oldest_teachers.akronym = l.akronym
ORDER BY 
    Alder DESC, Kursnamn;
