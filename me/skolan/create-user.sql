--
-- Create a user with full grants.
--
DROP USER IF EXISTS 'dagge'@'localhost';
DROP USER IF EXISTS 'dagge'@'%';

CREATE USER 'dagge'@'localhost'
IDENTIFIED BY 'P@ssw0rd'
;

GRANT ALL PRIVILEGES
ON *.* TO 'dagge'@'localhost'
WITH GRANT OPTION
;

CREATE USER 'dagge'@'%'
IDENTIFIED BY 'P@ssw0rd'
;

GRANT ALL PRIVILEGES
ON *.* TO 'dagge'@'%'
WITH GRANT OPTION
;

FLUSH PRIVILEGES;

SELECT USER();

SHOW GRANTS;