--
-- Update a column value
--
UPDATE larare SET lon = 30000 WHERE akronym = 'gyl';

-- Update alternative ways
UPDATE larare SET lon = 30000 WHERE akronym = 'gyl' OR akronym = 'ala' ;
UPDATE larare SET lon = 30000 WHERE akronym IN ('gyl', 'ala');
UPDATE larare SET lon = 30000 WHERE lon IS NULL ;

-- check the result
SELECT akronym, avdelning, fornamn, kon, lon, kompetens
FROM larare
ORDER BY lon DESC;

SELECT  *, DATE_FORMAT(fodd, '%Y-%m-%d') AS formatted_date 
        FROM larare
        ORDER BY akronym;