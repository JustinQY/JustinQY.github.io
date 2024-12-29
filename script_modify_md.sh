#!/bin/bash
for file in *; do
    create_date=$(stat -f "%SB" -t "%Y/%m/%d" $file)
    echo "---" > "iOS_$file"
    echo "date: $create_date" >> "iOS_$file"
    echo "title: $(basename "$file" .md)" >> "iOS_$file"
    echo "category: " >> "iOS_$file"
    echo "tags: iOS" >> "iOS_$file"
    echo "cover: " >> "iOS_$file"
    echo "---" >> "iOS_$file"
    cat "$file" >> "iOS_$file"
done