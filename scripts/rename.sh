#!/bin/bash
# Rename all *.jsx
for f in *.jsx; do
    mv -- "$f" "${f%.jsx}.js"
done
