--
-- Delete from database skolan.
--

-- Radera Hagrid (1 rad).
DELETE FROM larare WHERE fornamn = 'Hagrid';

--Radera alla som jobbar på avdelningen DIPT (3 rader).
DELETE FROM larare WHERE avdelning = 'DIPT';

-- Radera alla som har en lön, men begränsa antalet rader som får raderas till 2 (LIMIT) (2 “slumpmässiga” rader påverkas).
DELETE FROM larare WHERE lon LIMIT 2; 

-- Radera samtliga återstående lärare.
DELETE FROM larare;