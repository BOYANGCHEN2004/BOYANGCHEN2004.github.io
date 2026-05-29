---
layout: archive
title: ML
---

<p><a class="back-link" href="/posts/">&larr; Back</a></p>

{% assign items = site.pages | where_exp: "p", "p.path contains 'posts/ml/'" %}
<ul>
{% for p in items %}
  {% unless p.url == page.url %}
    <li><a href="{{ p.url }}">{{ p.title }}</a></li>
  {% endunless %}
{% endfor %}
</ul>
