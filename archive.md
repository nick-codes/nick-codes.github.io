---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive">

{% for post in site.posts %}
	{% assign year = post.date | date: '%Y' %}
	{% assign nextyear = post.next.date | date : '%Y' %}
	{% assign month = post.date | date: '%b' %}
	{% assign nextmonth = post.next.date | date : '%b' %}

	{% if year != nextyear %}

		{% if post.previous %}
			</ul></li></ul>
		{% endif %}

		<h3>{{ year }}</h3>
		<ul>
			<li>{{ month }}<ul>
			    <li>
					<a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</li>
	{% else %}
		{% if month != nextmonth %}
			</ul></li><li>{{ month }}<ul>
				<li>
					<a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</li>
		{% else %}
			    <li>
					<a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</li>
		{% endif %}
	{% endif %}
{% endfor %}

{% if site.posts %}
	</ul></li></ul>
{% endif %}

</div>