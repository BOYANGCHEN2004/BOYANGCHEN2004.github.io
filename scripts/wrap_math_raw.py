#!/usr/bin/env python3
import re
from pathlib import Path

posts = Path('posts')
md_files = list(posts.rglob('*.md'))
pattern = re.compile(r"\$\$\n(.*?)\n\$\$", re.S)
for p in md_files:
    s = p.read_text(encoding='utf-8')
    def repl(m):
        content = m.group(0)
        # already wrapped?
        if s[max(0, m.start()-12):m.start()].endswith('{% raw %}\n'):
            return content
        return '{% raw %}\n' + content + '\n{% endraw %}'
    new = pattern.sub(repl, s)
    if new != s:
        p.write_text(new, encoding='utf-8')
        print('Wrapped', p)
print('Done')
