--
-- Aggregating functions
--

-- Här är ett par minnesregler.
-- “WHERE kommer innan GROUP BY och HAVING kommer efter”.
-- “HAVING är för aggregerade värden.”.

-- SELECT SUM(lon) FROM larare;
SELECT SUM(lon) FROM larare;
-- Hur mycket är den högsta lönen som en lärare har?
SELECT MAX(lon) FROM larare; -- '85000'
-- Hur mycket är den lägsta lönen som en lärare har?
SELECT MIN(lon) FROM larare; -- '27594'

SELECT AVG(kompetens) FROM larare;

SELECT
    avdelning,
    AVG(kompetens)
FROM larare
GROUP BY avdelning
;

SELECT avdelning, kompetens, SUM(lon) as Summa
FROM larare
GROUP BY avdelning, kompetens
ORDER BY Summa DESC
;

-- Hur många lärare jobbar på de respektive avdelning?
SELECT avdelning, COUNT(avdelning) as Summa_lärare
FROM larare
GROUP BY avdelning
ORDER BY avdelning ASC
;

-- Hur mycket betalar respektive avdelning ut i lön varje månad?
SELECT avdelning, SUM(lon) as Summa_avdelning
FROM larare
GROUP BY avdelning
ORDER BY avdelning ASC
;

-- Hur mycket är medellönen för de olika avdelningarna?
SELECT avdelning, AVG(lon) as Summa_avdelning
FROM larare
GROUP BY avdelning
ORDER BY avdelning ASC
;

-- Hur mycket är medellönen för kvinnor kontra män?
SELECT kon, AVG(lon) as Summa_medellön
FROM larare
GROUP BY kon
ORDER BY Summa_medellön ASC
;

-- Visa snittet på kompetensen för alla avdelningar, sortera på kompetens i sjunkande 
-- ordning och visa enbart den avdelning som har högst kompetens.
SELECT avdelning, AVG(kompetens) as Kompetens
FROM larare
GROUP BY avdelning
ORDER BY kompetens DESC
LIMIT 1
;

-- Visa den avrundade snittlönen (ROUND()) grupperad per avdelning och per kompetens, 
-- sortera enligt avdelning och snittlön. 
-- Visa även hur många som matchar i respektive gruppering. Ditt svar skall se ut så här.
SELECT avdelning AS Avdelning,
    kompetens AS Kompetens,
    ROUND(AVG(lon)) AS Snittlon,
    COUNT(*) AS Antal
FROM larare
GROUP BY avdelning, kompetens
ORDER BY avdelning, Snittlon
;

-- Vi vill se snittlön per avdelning (och antal), men bara om snittlönen är större än 35000.
SELECT avdelning,
    ROUND(AVG(lon)) AS Snittlon,
    COUNT(lon) AS Antal
FROM larare
GROUP BY avdelning
HAVING Snittlon > 35000
ORDER BY Snittlon DESC
;

-- Vi vill se snittlönen per avdelning (och antal), men bara om det är 3 eller fler personer 
-- på den avdelningen.
SELECT avdelning,
    ROUND(AVG(lon)) AS Snittlon,
    COUNT(lon) AS Antal
FROM larare
GROUP BY avdelning
HAVING Antal >= 3
ORDER BY Snittlon DESC
;

-- Visa per avdelning hur många anställda det finns, gruppens snittlön, 
-- sortera per avdelning och snittlön.
SELECT avdelning,
    ROUND(AVG(lon)) AS Snittlon,
    COUNT(*) AS Antal
FROM larare
GROUP BY avdelning
ORDER BY avdelning, Snittlon
;

-- Visa samma sak som i 1), men visa nu även de kompetenser som finns. 
-- Du behöver gruppera på avdelning och per kompetens, sortera per avdelning och per kompetens.
SELECT avdelning, kompetens,
    ROUND(AVG(lon)) AS Snittlon,
    COUNT(*) AS Antal
FROM larare
GROUP BY avdelning, kompetens
ORDER BY avdelning, kompetens DESC
;

-- Visa samma sak som i 2), men ignorera de kompetenser som är större än 3.

-- Visa samma sak som i 3), men exkludera de grupper som har fler än 1 deltagare och inkludera 
-- de som har snittlön mellan 30 000 - 45 000. Sortera per snittlön.

SELECT avdelning, kompetens,
    ROUND(AVG(lon)) AS Snittlon,
    COUNT(*) AS Antal
FROM larare
GROUP BY avdelning, kompetens
HAVING Antal = 1 AND Snittlon BETWEEN 30000 AND 45000
ORDER BY Snittlon DESC;
