--
-- Reset part 3
--
source create-database.sql;

use skolan;

-- source ddl-larare.sql
-- source insert-larare.sql
-- source ddl-alter.sql
-- source dml-update.sql
-- source ddl-copy.sql
-- source dml-update-lonerevision.sql
-- source dml-view.sql
-- source dml-join.sql

source ddl.sql
source insert.sql
source dml-update-lonerevision.sql
source insert-csv.sql

SELECT * FROM v_course_opportunities;

SELECT * FROM v_age_of_course_leaders;

SELECT * FROM v_age_of_course_leaders_teaches_courses;

SELECT
    SUM(lon) AS 'Lönesumma before',
    SUM(kompetens) AS Kompetens
FROM larare_pre;

SELECT 
    SUM(lon) AS 'Lönesumma after',
    SUM(kompetens) AS Kompetens
FROM larare;

SHOW FULL TABLES;