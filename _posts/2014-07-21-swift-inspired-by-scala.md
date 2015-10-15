---
title: 'Swift: Inspired by Scala?'
date: '2014-07-21'
description: 'A discussion of how similar Swift and Scala are.'
tags: [swift, scala]
categories: ['code']
layout: 'post'
permalink: '/posts/swift-inspired-by-scala'
---

As part of WWDC this year in San Francisco,
[Apple](http://apple.com) announced a [new programming language for
iOS called
Swift](http://techcrunch.com/2014/06/02/apple-launches-swift-a-new-programming-language-for-writing-ios-and-os-x-apps/).

I took a look at [the Swift language
guide](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_399)
and I was surprised to see that the language has been heavily
influenced by [Scala](http://www.scala-lang.org/). But then, what language isn't being heavily influenced by Scala lately? Even Java 8 has added Scala like features in the form
of [Lambda expressions](https://leanpub.com/whatsnewinjava8/read#leanpub-auto-lambda-expressions).

Never the less, I was pleased with many of the choices that Swift has
made. It is certainly a huge leap forward from Objective-C, and a long
overdue one. The language looks awesome.

<table class="table table-striped table-bordered table-hover table-condensed">
<tr>
	<th></th>
	<th>Scala</th>
	<th>Swift</th>
</tr>
<tr>
	<th>Constants</th>
	<td>val max = 10</td>
	<td>let max = 10</td>
</tr>
<tr>
	<th>Variables</th>
	<td>var min = 5</td>
	<td>var min = 5</td>
</tr>
<tr>
	<th>Type Annotation</th>
	<td>var welcome: String</td>
	<td>var welcome: String</td>
</tr>
<tr>
	<th>Printing</th>
	<td>println(welcome)</td>
	<td>println(welcome)</td>
</tr>
<tr>
	<th>Semicolons</th>
	<td>Optional</td>
	<td>Optional</td>
</tr>
<tr>
	<th>Comments</th>
	<td>// Single Line <br/> /*<br/>&nbsp;* Multi-Line<br/>&nbsp;*/</td>
	<td>// Single Line <br/> /*<br/>&nbsp;* Multi-Line<br/>&nbsp;*/</td>
</tr>
<tr>
	<th>Type Safety</th>
	<td>Yes</td>
	<td>Yes</td>
</tr>
<tr>
	<th>Type Inference</th>
	<td>Yes</td>
	<td>Yes</td>
</tr>
<tr>
	<th>Type Alias</th>
	<td>type AudioSample = Int</td>
	<td>typelias AudoSample UInt16</td>
</tr>
<tr>
	<th>Tuples</th>
	<td>val http404Erro = (404, "NotFound")</td>
	<td>let http404Erro = (404, "NotFound")</td>
</tr>
<tr>
	<th>Optionals</th>
	<td>val name: Option[String]</td>
	<td>val name = String?</td>
</tr>
<tr>
	<th>Unwrapping Optionals</th>
	<td>name.get</td>
	<td>name!</td>
</tr>
<tr>
	<th>Optional Binding</th>
	<td>val converted = num.getOrElse(default)</td>
	<td>if let converted = num { let converted = default }</td>
</tr>
<tr>
	<th>Ranges</th>
	<td>1 to 10</td>
	<td>1...10</td>
</tr>
<tr>
	<th>Ranges</th>
	<td>1 to 10</td>
	<td>1...10</td>
</tr>
<tr>
	<th>String Interpolation</th>
	<td>val message = s"Some $value"</td>
	<td>let message = "Some \(value)"</td>
</tr>
<tr>
	<th>Array Literals</th>
	<td>val arr = Array("Hello","World")</td>
	<td>let arr = ["Hello", "World"]</td>
</tr>
<tr>
	<th>Dictionaries</th>
	<td>var airports = Map(("TYO", "Tokyo"), ("DUB", "Dublin"))</td>
	<td>var airports: Dictionary<String, String>= ["TYO": "Tokyo", "DUB": "Dublin"]</td>
</tr>
<tr>
	<th>Accessing Dictionaries</th>
	<td>airports("TYO")</td>
	<td>airports["TYO"]</td>
</tr>
<tr>
	<th>Iterating Dictionaries</th>
	<td>for ((airportCode, airportName)<- airports)</td>
	<td>for (airportCode, airportName) in airports { ... }</td>
</tr>
<tr>
	<th>Switch with Range</th>
	<td>t match { case x if ((0 to 10).contains(x)) =>true ; case _ =>false }</td>
	<td>switch t { case 0...10 return true; default: return false }</td>
</tr>
<tr>
	<th>Named Parameters</th>
	<td>def printName(first:String, last:String) { println(first + " " + last) }</td>
	<td>func printName(#first: String, #last: String) { ... }</td>
</tr>
<tr>
	<th>Default Parameter Values</th>
	<td>func join(start, middle = " ", end)</td>
	<td>func join (start, middle = " ", end)</td>
</tr>
<tr>
	<th>Generics</th>
	<td>func concat&lt;T&gt;(a: T, b: T)</td>
	<td>func concat&lt;T&gt;(a: T, b: T)</td>
</tr>
<tr>
	<th>Extension / Mixins</th>
	<td>trait Mixin {<br/>&nbsp;var i: Double;<br/>&nbsp;def doSomething() { }<br/> } </td>
	<td>extension Mixin {<br/>&nbsp;var i: Double;<br/>&nbsp;doSomething() { }<br/> } </td>
</tr>
</table>

As you can see, other than the change from *val* to the pascal like
*let*, many of the language features are exactly the same.  It is
great to see Apple finaly come to the table with a modern language
design. Now if only Google would step up and bring Java 8 features to
Android. Google recently added support for [Java 7
features](http://tools.android.com/tech-docs/new-build-system/user-guide#TOC-Using-sourceCompatibility-1.7)
features if you are using Gradle and jump through some hoops, though
try with resources is only supported on API 19 and above due to the
need for support in the VM. Considering that Oracle released version 7
in July 2011, so we can expect Google to add Java 8 features in 2017!
;)

I am looking forward to using Swift to make my iOS code suck less to write.
