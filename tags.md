---
layout: page
title: Tags
permalink: /tags/
---

{% capture tags %}{% for tag in site.tags %}{{ tag[0] }},{% endfor %}{% endcapture %}
{% assign sortedtags = tags | split:',' | strip | sort %}

<div class="tags">
  <ul>
  {% for tag in sortedtags %}
    <li>
      <a href="#{{ tag }}">{{ tag }} ({{ site.tags[tag].size }})</a>
    </li>
  {% endfor %}
  </ul>
</div>

{% for tag in sortedtags %}
  <h3 id="{{ tag }}">{{ tag }} ({{ site.tags[tag].size }})</h3>
  <ul>
  {% for post in site.tags[tag] %}
    {% if post %}
      <li>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  </ul>
{% endfor %}