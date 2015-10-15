---
title: 'Color Resources Must Be Resolved'
date: '2014-05-21'
tags: ['android', 'wtf?']
categories: ['code']
layout: 'post'
---

I recently found some rather unfortunate code in an Android project I was working with:

~~~
private static final int MAIN_COLOR = R.color.main_color;
private static final int SECONDARY_COLOR = R.color.main_color | (0x05 << 24);
~~~

This is sucky code for two reasons. The first is that applying an
alpha in this way is dubious at best. Why not use another <a
href="http://developer.android.com/guide/topics/resources/more-resources.html#Color">color
resource</a>?

The second is that android color resources are not materialized in the
resource array. That is the value of R.color.main_color from the resource file:

~~~
<resources>
  <color name="main_color">#aabbcc"</a>
</resources>
~~~

is not in fact ```0xAABBCC``` but is in fact an arbitrary id number
picked by the resource compiler. To get the value you need to resolve
the id to a color using <a
href="http://developer.android.com/reference/android/content/res/Resources.html#getColor(int)">getContext()
.getResources() .getColor(R.color.main_color);</a> Thus the above
```SECONDARY_COLOR``` may change arbitrarily as you add and remove
color resources and the compiler updates the ids.  Even worse, if the
project is a library project, the id may change depending on which
application you are bundling the library with, as the resource
compiler has to have all ids unique within the entire application.

In conclusion, make your code suck less by not mistaking
R.color.&lt;anything&gt; for an actual integer representation of the color.

Color resources must be resolved!
