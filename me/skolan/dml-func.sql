--
-- Built-in features
--

-- Skriv en SELECT-sats som skriver ut förnamn + efternamn + avdelning i samma kolumn enligt följande struktur: 
-- förnamn efternamn (avdelning). (Tips: Att slå ihop strängar kallas att konkatenera/concatenate).
SELECT CONCAT(fornamn, ' ', efternamn, ' (', avdelning, ')') AS NamnAvdelning
FROM larare
;

-- Gör om samma sak men skriv ut avdelningens namn med små bokstäver och begränsa utskriften till 3 rader.
SELECT CONCAT(fornamn, ' ', efternamn, ' (', LOWER(avdelning), ')') AS NamnAvdelning
FROM larare
LIMIT 3
;

-- Skriv en SELECT-sats som endast visar dagens datum.
SELECT CURDATE() AS `Dagens datum`;

-- Gör en SELECT-sats som visar samtliga lärare, deras födelseår samt dagens datum och klockslag.
SELECT fornamn,
    DATE_FORMAT(fodd, '%Y-%m-%d') AS Fodd,
    CURDATE() AS `Dagens datum`,
    TIME(NOW()) AS Klockslag
FROM larare
;

-- Skriv en SELECT-sats som beräknar lärarens ålder, sortera rapporten för att visa vem som är äldst och yngst.
SELECT fornamn,
    DATE_FORMAT(fodd, '%Y-%m-%d') AS Fodd,
    TIMESTAMPDIFF(YEAR, fodd, CURDATE()) AS Ålder
FROM larare
ORDER BY Ålder DESC
;

-- Visa de lärare som är födda på 40-talet.
SELECT fornamn, fodd 
FROM larare 
WHERE YEAR(fodd) BETWEEN 1940 AND 1949
;
