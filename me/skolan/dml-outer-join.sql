--
-- Outer join
--

-- We look at which teachers are responsible for at least one course.

SELECT DISTINCT
    akronym AS Akronym,
    CONCAT(fornamn, " ", efternamn) AS Namn
    FROM v_planering
    ORDER BY akronym
;
     
-- Outer join, include teachers without teaching

SELECT DISTINCT
    l.akronym AS Akronym,
    CONCAT(l.fornamn, " ", l.efternamn) AS Namn,
    l.avdelning AS Avdelning,
    kt.kurskod AS Kurskod
FROM larare AS l
    LEFT OUTER JOIN kurstillfalle AS kt
        ON l.akronym = kt.kursansvarig
;

-- Courses without course opportunities

SELECT DISTINCT
    k.kod AS Kurskod,
    k.namn AS Kursnamn,
    kt.lasperiod AS Läsperiod
FROM kurs AS k
    LEFT OUTER JOIN kurstillfalle AS kt
        ON k.kod = kt.kurskod
WHERE kt.lasperiod IS NULL;
