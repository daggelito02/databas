--
-- Insert values into table larare.
--
-- Begin reset the table from all data

DELETE FROM larare;

--
-- Add teacher staff
--

INSERT INTO larare VALUES
    ('sna', 'DIPT', 'Severus', 'Snape', 'M', 40000, '1951-05-01', 1),
    ('dum', 'ADM', 'Albus', 'Dumbledore', 'M', 80000, '1941-04-01', 1),
    ('min', 'DIDD', 'Minerva', 'McGonagall', 'K', 40000, '1955-05-05', 1),
    ('hag', 'ADM', 'Hagrid', 'Rubeus', 'M', 25000, '1956-05-06', 1),
    ('fil', 'ADM', 'Argus', 'Filch', 'M', 25000, '1946-04-06', 1),
    ('hoc', 'DIDD', 'Madam', 'Hooch', 'K', 35000, '1948-04-08', 1),
    ('gyl', 'DIPT', 'Gyllenroy', 'Lockman', 'M', NULL, '1952-05-02', 1),
    ('ala', 'DIPT', 'Alastor', 'Moody', 'M', NULL, '1943-04-03', 1)
;

--
-- Update column values
--

UPDATE larare SET lon = 30000 WHERE lon IS NULL ;

--
-- Copy to larare_pre
--

INSERT INTO larare_pre SELECT * FROM larare;



