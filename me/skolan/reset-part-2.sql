--
-- Restore the database (part 2)
--

source create-database.sql;

use skolan;

source ddl-larare.sql
source insert-larare.sql
source ddl-alter.sql
source dml-update.sql
source ddl-copy.sql
source dml-update-lonerevision.sql
source dml-view.sql
source dml-join.sql


SELECT 
    'Larare' AS Källa,
    SUM(lon) AS 'Lönesumma',
    SUM(kompetens) AS Kompetens
FROM larare
UNION ALL
SELECT 
    'Larare_Pre' AS Källa,
    SUM(lon) AS 'Lönesumma',
    SUM(kompetens) AS Kompetens
FROM larare_pre;
