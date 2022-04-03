#!/usr/bin/env bash
. ".dbwebb/inspect-src/kmom.d/functions.bash"

TARGET_DIR="me/kmom10/eshop3"
CHECK_FILES="package.json config/db/eshop.json index.js cli.js sql/eshop/setup.sql sql/eshop/ddl.sql sql/eshop/insert.sql sql/eshop/reset.sql sql/eshop/backup.sql"

cd $TARGET_DIR || exit 1

all=0
fail=0
for file in $CHECK_FILES; do
    (( all++ ))
    if [[ ! -f "$file" ]]; then
        printf "Missing file '$file'.\n"
        (( fail++ ))
    fi
done

doLog $fail "$TARGET_DIR: check files ("$(( all-fail ))"/$all)"
