--
-- Create databas skolan
--
-- Börja med att radera databasen om den finns
DROP DATABASE IF EXISTS skolan;

-- Skapa databas
CREATE DATABASE skolan;

-- Välj vilken databas du vill använda
USE skolan;

-- Radera en databas med allt innehåll
-- DROP DATABASE skolan;

-- CREATE DATABASE skolan;
-- CREATE DATABASE IF NOT EXISTS skolan;

-- Visa vilka databaser som finns
-- SHOW DATABASES;

-- Visa vilka databaser som finns
-- som heter något i stil med *skolan*
SHOW DATABASES LIKE "%skolan%";