--
-- Restore the database 1
--

source create-database.sql;

use skolan;

source ddl-larare.sql
source insert-larare.sql
source ddl-alter.sql
source dml-update.sql
-- source ddl-copy.sql
source dml-update-lonerevision.sql
-- source dml-view.sql


SELECT
    SUM(lon) AS 'Lönesumma',
    SUM(kompetens) AS Kompetens
FROM larare;