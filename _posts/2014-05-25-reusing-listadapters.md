---
title: 'Reusing ListAdapters'
date: '2014-05-25'
tags: ['android', 'ListAdapter', 'pattern', 'View Holder']
categories: ['code']
layout: 'post'
---

In [a previous
post](http://nick.codes/posts/view-holder-pattern-improved/), I talked
about how to improve on the classic "View Holder Pattern" commonly
used to speed up list drawing on Android.

The basic idea there was to use
[composition](http://en.wikipedia.org/wiki/Object_composition) in
order to properly
[encapsulate](http://en.wikipedia.org/wiki/Encapsulation_(object-oriented_programming\))
data inside of the ViewHolder.

In this article I am going to show you how you can use
[generics](http://en.wikipedia.org/wiki/Generics_in_Java) to further
increase code reuse for ListAdapters, and eliminate the need to write
repetitive `getView()` code for every adapter.

The primary observation here is that the list adapter doesn't really
do a lot.  In particular, since we have delegated most of the work of
finding the views and binding the data into the ViewHolder, we can use
generics to make the ListAdapter more reusable, regardless of what
layout and view we are using. All the heavy lifting is managed in the
ViewHolder already anyway.

In [the last
article](http://nick.codes/posts/view-holder-pattern-improved/), we
ended up with a ListAdapter which had a `getView()` method that looked
like this:

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

In order to make this ListAdapter reusable, we need to be able to give
a way for the ViewHolder to be constructed by the list adapter, and we
need that view holder to accept data from our list adapter. Ideally we
would like this to all be [type
safe](http://en.wikipedia.org/wiki/Type_safe) which is where generics
come in.

We begin by building a base class for our ViewHolders which has the
right interface needed by our `getView()` method shown above. It looks
like this:

~~~
public abstract class ReusableViewHolder<T> {

	public ReusableViewHolder(View view) {
		view.setTag(this);
	}

	public abstract void bind(T data);
}
~~~

The nice thing about using this holder is that we can now never forget
to bind the ViewHolder to the view. In addition, the use of generics
means that the bind method can take data of whatever type our
application is using. Yeah type safety!

Now for our next step, we will build a ReusableListAdapter that can
build this holder. This is quite simple, as we simply delegate the
ReusableViewHolder<T> construction to the subclass using an abstract
method. This gives us code for the ListAdapter that looks like this:

~~~
@Override
public View getView(final int position, final View convertView, final ViewGroup parent) {
	ReusableViewHolder<T> holder;
	View boundView;

	if (convertView == null) {
		boundView = mInflater.inflate(mLayoutId, null);
		holder = buildViewHolder(boundView);
	} else {
		boundView = convertView;
		holder = (ReusableViewHolder<T>) boundView.getTag();
	}
	holder.bind(getItem(position));

	return boundView;
}

protected abstract ReusableViewHolder<T> buildViewHolder(View view);
~~~

The great thing about this is that now when we want to build a
ListAdapter, we simply have one method to implement which is completely
trivial. It simply has to return a new instance of the subclass of
ReusableViewHolder we are using. We could instead pass in a type token
and use reflection to construct this instance, but the performance
penalty for using reflection is pretty high, and adding a method with
a single new in it is already a pretty trivial implementation.

For an example of this pattern being used please see the [companion
repository on
Github](http://github.com/nickpalmer/ReusableListAdapter.git)

Make your code suck less by using generics to facilitate code reuse!
