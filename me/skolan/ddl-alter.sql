--
-- Uddate with ALTER
--

-- Add column "kompetens" to table
ALTER TABLE larare ADD COLUMN kompetens INT;

-- Remove column "kompetens" from table
ALTER TABLE larare drop COLUMN kompetens;

-- ADD column "kompetens" to table with default value 1 (DEFAULT) and no NULL values
ALTER TABLE larare ADD COLUMN kompetens INT NOT NULL DEFAULT 1;
