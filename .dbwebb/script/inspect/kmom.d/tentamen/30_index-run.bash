#!/usr/bin/env bash
cd me/tentamen || exit

target="exam"

echo "
FÖLJANDE SKALL FUNGERA via localhost:1337
----------------------
$target/index    - Välkomstsida, gemensam header footer och navigering
$target/report   - Rapport av joinad tabell

(servern startas i bakgrunden och dödas senare)
(var med på att utskrift från servern krockar med annan utskrift)
"

# Kill process, before starting a new
pid=$( lsof -n -i4TCP:1337 | grep LISTEN | awk '{ print $2 }' )
[[ $pid ]] && kill $pid && echo "Killed pid '$pid' on port 1337"

DBWEBB_PORT=1337 node index.js &
sleep 2
read -p "Press enter to continue..."
