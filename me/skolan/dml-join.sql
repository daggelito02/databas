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

-- Skapa rapporten som visar resultatet enligt nedan.
-- Spara rapporten som en vy v_lonerevision.
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
    akronym,
    fornamn,
    efternamn,
    pre,
    nu,
    diff,
    proc,
    mini
FROM v_lonerevision
ORDER BY proc DESC;

-- Sedan tittar vi enbart på kompetensen.

SELECT 
    akronym,
    fornamn,
    efternamn,
    pre_kompetens AS prekomp,
    nu_kompetens AS nukomp,
    kompetens_diff AS diffkomp
FROM v_lonerevision
ORDER BY nukomp DESC, diffkomp DESC
;

