--
-- Subquery, a question within a question
--

 SELECT
	akronym,
	fornamn,
	efternamn,
	alder
FROM v_larare
WHERE alder = (SELECT MAX(alder) FROM v_larare);