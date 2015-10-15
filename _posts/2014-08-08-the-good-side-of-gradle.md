---
title: 'The Good Side of Gradle'
date: '2014-08-08'
description: Gradle has some pretty useful plugins
tags: ['gradle', 'plugin']
categories: ['build']
layout: 'post'
---

While it's true that [I think buck is
awesome](http://nick.codes/posts/why-buck-is-awesome/), the Android
tools team has thrown their weight behind
[Gradle](http://tools.android.com/tech-docs/new-build-system/user-guide),
which gives Gradle a serious advantage in the traction department.

This has resulted in a plethora of plugins being developed which do
some awesome things. And while I prefer buck for actual builds,
I am taking advantage of some of the work being done on
gradle plugins to take care of some tasks associated with
building Android projects.

[Jake Wharton](https://plus.google.com/+JakeWharton) has released
several that are interesting. Most recently he released the [SDK
Manager Plugin](https://github.com/JakeWharton/sdk-manager-plugin),
which is awesome for building on CI machines where you don't want to
have to be bothered with all the details of finding and installing the
right SDK version.

Mr. Wharton has also released a plugin for using espresso with gradle
called [double
espresso](https://github.com/JakeWharton/double-espresso). This plugin
makes it much easier to get espresso tests running using gradle.

There is also the highly useful [android quality
plugin](https://github.com/nrudenko/gradle-android-cq-plugin) which
gives [findbugs](http://findbugs.sourceforge.net/)
[pmd](http://pmd.sourceforge.net/) [copy paste
detector](http://pmd.sourceforge.net/) and
[checkstyle](http://checkstyle.sourceforge.net/) targets that can be
used to help track software quality.

If you are using [Robolectric]() for tests then consider using their
[Android Test Plugin](https://github.com/robolectric/gradle-android-test-plugin)
to get tests running quickly in the IDE, which is a fork of
an earlier plugin, again from Mr. Wharton. Have I mentioned he is
awesome? Having never met him, I can honesty say he is. ;~)

Another really useful plugin for working with Android on CI servers is
the [Android Command
Plugin](https://github.com/novoda/gradle-android-command-plugin),
which makes it easier to install particular builds on particular
devices and run commands against them.

What plugins are you using to make your builds suck less?
