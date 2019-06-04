#!/usr/bin/env bash

printf ">>> -------------- Pre inspect -------------------------\n"

target="exam"

# Open er.pdf in browser
printf "Open doc/er.pdf in browser\n"
eval "$BROWSER" "me/tentamen/doc/er.pdf" &

# Open localhost:1337 in browser
printf "Open localhost:1337/$target/index in browser\n"
eval "$BROWSER" "http://127.0.0.1:1337/$target/index" &

echo
