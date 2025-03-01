--
-- Check status
--
SHOW VARIABLES LIKE "%version%";

SELECT @@version;


-- https://mariadb.com/kb/en/mysqlglobal_priv-table/
SELECT User, Host FROM mysql.global_priv;
