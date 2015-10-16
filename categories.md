---
layout: page
title: Categories
permalink: /categories/
---

{% capture categories %}{% for category in site.categories %}{{ category[0] }},{% endfor %}{% endcapture %}
{% assign sortedcategories = categories | split:',' | strip | sort %}

<div class="categories">
  <ul>
  {% for category in sortedcategories %}
    <li>
      <a href="#{{ category }}">{{ category }} ({{ site.categories[category].size }})</a>
    </li>
  {% endfor %}
  </ul>
</div>

{% for category in sortedcategories %}
  <h3 id="{{ category }}">{{ category }} ({{ site.categories[category].size }})</h3>
  <ul>
  {% for post in site.categories[category] %}
    {% if post %}
      <li>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}