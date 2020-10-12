---
layout: page
title: Tags
permalink: /tags/
---
<div class="tags">
  <ul>
  {% for tag in site.tags %}
    <li>
      <a href="#{{ tag[0] }}">{{ tag[0] }} ({{ tag[1].size }})</a>
    </li>
  {% endfor %}
  </ul>
</div>

{% for tag in site.tags %}
  <h3 id="{{ tag[0] }}">{{ tag[0] }} ({{ tag[1].size }})</h3>
  <ul>
  {% for post in tag[1] %}
    {% if post %}
      <li>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}
