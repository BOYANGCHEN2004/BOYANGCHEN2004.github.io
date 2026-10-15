#!/usr/bin/env python3
import re
from pathlib import Path

posts = Path('posts')
md_files = list(posts.rglob('*.md'))
for p in md_files:
    s = p.read_text(encoding='utf-8')
    def repl(m):
        body = m.group(1)
        # remove blank lines inside math block
        lines = body.splitlines()
        new_lines = [ln for ln in lines if ln.strip() != '']
        return '$$\n' + '\n'.join(new_lines) + '\n$$'
    new = re.sub(r"\$\$\n(.*?)\n\$\$", repl, s, flags=re.S)
    if new != s:
        p.write_text(new, encoding='utf-8')
        print('Fixed', p)
print('Done')
