#!/usr/bin/env python3
import pathlib
import re

root = pathlib.Path(__file__).resolve().parents[1]
md_files = list(root.glob('**/*.md'))
pattern = re.compile(r"(.*?)(\{%\s*(?:endraw|raw)\s*%\})(.*)")
fixed = 0
for p in md_files:
    text = p.read_text(encoding='utf-8')
    lines = text.splitlines()
    changed = False
    new_lines = []
    for line in lines:
        m = pattern.match(line)
        if m:
            before, tag, after = m.groups()
            if before.strip():
                new_lines.append(before)
            new_lines.append(tag)
            if after.strip():
                new_lines.append(after)
            changed = True
        else:
            new_lines.append(line)
    if changed:
        p.write_text('\n'.join(new_lines) + '\n', encoding='utf-8')
        fixed += 1

print(f"Fixed {fixed} files")
