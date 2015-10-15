---
title: 'View Holder Pattern Improved'
date: '2014-05-20'
tags: ['android','pattern','View Holder']
categories: ['code']
layout: 'post'
permalink: '/posts/view-holder-pattern-improved'
---

Most Android programmers know that to get buttery smooth list
performance you have to make use of the <a
href="http://developer.android.com/training/improving-layouts/smooth-scrolling.html">View
Holder Pattern</a> in order to avoid repeated calls to
<a href="http://developer.android.com/reference/android/app/Activity.html#findViewById(int)">```findViewById()```</a>, which can be very expensive.

However, the tutorial that Google offers for this pattern, and thus
the way that many developers end up using it, does a very bad job of
separating concerns.

The blog from Android about this suggests using the following class:

~~~
static class ViewHolder {
  TextView text;
  TextView timestamp;
  ImageView icon;
  ProgressBar progress;
}
~~~

And then it suggests that you populate this ViewHolder with a big
long block of formatting code in your list:

~~~
ViewHolder holder = new ViewHolder()
holder.icon = (ImageView) convertView.findViewById(R.id.listitem_image);
holder.text = (TextView) convertView.findViewById(R.id.listitem_text);
holder.timestamp = (TextView) convertView.findViewById(R.id.listitem_timestamp);
holder.progress = (ProgressBar) convertView.findViewById(R.id.progress_spinner);
convertView.setTag(holder);
~~~

They don't show you the block where you also bind data to the various views
in the holder, but as an example, you might have something like:

~~~
ValueObject value = getItem(position);
holder.text.setText(value.getText());
holder.timestamp.setText(value.getTimestamp());
holder.icon.setImageResource(value.getImageResource());
holder.progress.setSelection(value.getProgress());
~~~

So if we follow this pattern we end up with huge chunks of really long
code with three dots per line. Hard to read? It is for me.

This is prime territory for a refactor to an improved pattern.

I like to follow a construct and bind pattern. To do this we make the
ViewHolder class much richer, which has the upshot of letting us use
proper <a href="http://en.wikipedia.org/wiki/Encapsulation_(object-oriented_programming)">encapsulation</a>. It also makes the <a
href="https://developer.android.com/reference/android/widget/Adapter.html#getView(int,
android.view.View, android.view.ViewGroup)">```getView()```</a> code
much cleaner.

~~~
static class ViewHolder {
  private final TextView text;
  private final TextView timestamp;
  private final ImageView icon;
  private final ProgressBar progress;

  public ViewHolder(final View view) {
    text = (TextView) view.findViewById(R.id.listitem_text);
    timestamp = (TextView) view.findViewById(R.id.listitem_timestamp);
    icon = (ImageView) view.findViewById(R.id.listitem_image);
    progress = (ProgressBar) view.findViewById(R.id.progress_spinner);

    view.setTag(this);
  }

  public void bind(final ValueObject value) {
    text.setText(value.getText());
    timestamp.setText(value.getTimestamp());
    icon.setImageResource(value.getImageResource());
    progress.setProgress(value.getProgress());
  } 
}
~~~

Note that we have now encapsulated the views being held by the holder
properly, and we can even mark them final now, since they are
initialized in the constructor. Furthermore, it is very clear that the
setup is actually one time setup code. In addition, it is clear what
kind of data item the ViewHolder is bound to.

This gets even more awesome when you look at the <a
href="https://developer.android.com/reference/android/widget/Adapter.html#getView(int,
android.view.View, android.view.ViewGroup)">```getView()```</a> code
inside the list.

~~~
// Inside the adapter
public void getView(final int position, final View convertView, final ViewGroup parent) {
  ViewHolder holder;
  View boundView = convertView;
  if (boundView == null) {
    boundView = LayoutInflater.from(context).inflate(R.layout.row, null);
    holder = new ViewHolder(boundView);
  } else {
    holder = (ViewHolder) boundView.getTag();
  }
  holder.bind(getItem(position));

  return boundView;
}
~~~

This is so much more readable. It is also abstractable with just a little
bit more work to allow you to use a custom base list adapter, which
I will talk about in my next article.

As an alternative, one could turn the entire ViewHolder into a view,
<a
href="http://sriramramani.wordpress.com/2012/07/25/infamous-viewholder-pattern/">as
suggested in Sriram Ramani's article</a> but I tend to favor <a
href="http://en.wikipedia.org/wiki/Composition_over_inheritance">composition
over inheritance</a> wherever possible. The ViewHolder doesn't really
need any behaviors from View so why inherit?

If you go down the inheritance path, you have bound the layout to the
holder more tightly by inflating inside the holder, and you have added
an extra layer in the view hierarchy.

That is, unless you use a <a
href="https://developer.android.com/guide/topics/resources/layout-resource.html#merge-element">```<merge>```</a>
tag as the base of your layout file. However, using <a
href="https://developer.android.com/guide/topics/resources/layout-resource.html#merge-element">```<merge>```</a>
is problematic because the view tools in <a
href="http://developer.android.com/sdk/index.html">Eclipse</a> and <a
href="http://developer.android.com/sdk/installing/studio.html">Android
Studio</a> then can't validate that your views are going to be
inflated into a RelativeLayout or a LinearLayout. If you change the
type the ViewHolder extends you may run into issues with the layout. I
always prefer when my tools can tell me I am making a mistake.

Until next time, try to make your code suck less using the
"View Holder Pattern Improved."
