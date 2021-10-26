#!/bin/bash
# Rename all *.txt to *.text
for f in *.jsx; do
    mv -- "$f" "${f%.jsx}.js"
done
