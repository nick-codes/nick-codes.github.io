---
layout: page
title: Categories
permalink: /categories/
---

<div class="categories">
  <ul>
  {% for category in site.categories %}
  {{ category[0] }}
    <li>
      <a href="#{{ category[0] }}">{{ category[0] }} ({{ category[1].size }})</a>
    </li>
  {% endfor %}
  </ul>
</div>

{% for category in site.categories %}
  <h3 id="{{ category[0] }}">{{ category[0] }} ({{ category[1].size }})</h3>
  <ul>
  {% for post in category[1] %}
    {% if post %}
      <li>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
