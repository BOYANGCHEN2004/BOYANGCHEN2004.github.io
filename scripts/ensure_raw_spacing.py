#!/usr/bin/env python3
from pathlib import Path
import re

posts = Path('posts')
md_files = list(posts.rglob('*.md'))
pattern = re.compile(r"\{% raw %\}\n")
changed = []
for p in md_files:
    s = p.read_text(encoding='utf-8')
    new = s
    # Ensure there's a blank line before {% raw %}
    new = re.sub(r"([^\n])\n(\{% raw %\})", r"\1\n\n\2", new)
    # Ensure there's a blank line after {% endraw %}
    new = re.sub(r"(\{% endraw %\})([^\n])", r"\1\n\n\2", new)
    if new != s:
        p.write_text(new, encoding='utf-8')
        changed.append(str(p))
print('Updated files:', changed)
