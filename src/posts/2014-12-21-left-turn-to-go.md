---
title: 'Left turn to Go'
date: '2014-12-21'
description: A brief discussion of my journey into the world of Go.
tags: [Go,Java,Scala,awesome]
layout: 'post'
---

Recently, I have taken a bit of a left turn in terms of my career
path.  I had been spending a great deal of my professional time
working with [Android](http://www.android.com/), [Java](https://java.com),
and [Bluetooth LE](http://en.wikipedia.org/wiki/Bluetooth_low_energy), while doing some
[Scala](http://www.scala-lang.org/) development for backend
services. To be honest, I was a little burned out on working with
Android, and the quite unstable Bluetooth LE stack on that platform. I
was also dissatisfied with Scala as a language.

So I made a sharp left turn and wound up writing
[Go](http://golang.org/) full time. I hadn't planned on this, but now
that I have been working with Go full time for three months, I am
quite fond of it. A friend recently asked me about the shift from
Scala and Java to Go, and had I given up on functional and object
oriented programming in general.

I don't feel that I have completely given up on functional
programming, just on the Scala version. Scala has a number of very
serious problems, only some of which involve the magic required to
shoe horn a functional language onto a non-functional runtime. If
Scala were to update to run on a the Java 8 JVM then it may loose some
of the warts. In particular stack traces in Scala can be almost
impossible to decipher because of the compile time class generation
that Scala does to do this magical shoehorning. However, Java 8 adds a
lot of the features that made Scala worthwhile in the first place,
like closures, so I am not sure I would do Scala over Java 8 were I to
be faced with that choice.

The other problems with Scala have nothing to do with the shoehorn,
but have to do with the combination of the Java equivalent of static
import package.* and static import package.Class.* which can make it
VERY hard to read Scala. Combine this with implicits and Scala’s
preference for terseness over readability, sometimes to the point of
insanity, and you are left with a language that can be as hard to read
and maintain as Perl. That is not a good thing. In fact that is a very
very bad thing.

Software spends most of its lifecycle in maintenance not
development. Scala, while nice to write and very compact, often fails
at being maintainable. Like horribly. So while I love functional
concepts, I am not convinced that Scala made the right choices here.

So that brings us to object oriented (OO) programming. My friend asked me
if there are things I miss from the object oriented world now that I
am busy with Go all the time. The truth is, there are very few OO
constructions that I miss in Go.

Go has interfaces which can "inherit" in a compositional kind of way,
which gives you most of what is good in OO programming. At the same
time, it is missing a bunch of OO gotchas. For example, because Go is
not object oriented you don't run into Java's problem with ceding
control in a synchronized block to a method that can be
overridden. This is a great source of unexpected exceptions, deadlocks
and/or data corruption. See ["Effective Java"](http://www.amazon.com/gp/product/0321356683/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321356683&linkCode=as2&tag=nick.codes-20&linkId=A4EACIF5EJNTBFA7) item 67. Also see
"Effective Java" 41 for a serious issue with method overloading in
Java where the method you overloaded isn't called! Polymorphism has
some serious gotchas. In particular, in Java "selection of overloaded
methods is static, while selection among overridden methods is
dynamic." This has been a source of more than one bug in my Java
days. So I don't miss the OO gotchas in Go. So far I have not found
any language gotchas like that in Go.

However, you can use a struct as any of the interface types that it
implements, and if you do struct embedding you can even inherit
implementation. So while not "object oriented" it still allows for
many "object oriented" like constructions where you can inherit
implementation and use a single "object" as multiple types, which is
usually what you want to do anyway with objects anyway. It has taken
me a couple months of full time Go to "grok the Go way" of doing
things, but now that I have, I am REALLY liking it.

My output in Go is rapidly coming up to where it was in Java, and is
FAR past my Scala output despite spending more time with Scala. So to
me the Go learning curve is more shallow. At first Go FEELS like C,
but then it starts to dawn on you that it is more like C with some of
the good concepts from OO without all the baggage. Go is interfaces,
structs, functions, and methods on structs, with interface and struct
embedding as the "inheritance" mechanism.

So far I have nothing but positive things to say about Go. I can't say
the same for any language I have ever tried. And I have tried a
lot. My personal list of languages I have at least tinkered (written a
small program with) with includes: Basic, C, C++, ObjectiveC, C#,
Scala, Smalltalk / Squeak, Prolog, Python, Perl, Forth, HyperTalk,
AppleScript, Bash, PHP (terrible shit show), List, Scheme, AspectJ,
Assembly (x86, Arm, PPC, MC6800), Batch, Ruby, Clojure, JavaScript,
CoffeeScript, Fortran, MATLAB, Swift, LaTEX, R, and Groovy. I like Go
better than all of these.

The things that I miss in Go are the Scala val. Java doesn't really
have an equivalent unless you declare something final and ensure it
has final members or no methods which mutate state post
construction. It isn't as clear to the reader in Java as it is in Scala.

Go has constants but they are completely limited to compile time and
are thus limited to things you can construct entirely at declaration
time. You cannot use the return from a function as an immutable object
which I see as a bit of a weakness, but a limited one. Standard
practice in Go is to use a private var for these kinds of things and
just behave properly with it in the package. This is reasonable if not
ideal.

Go has closures, so there is no reason that you couldn't write Go in a
functional way, people just don't. Scala often uses a throw to hide an
error that can be returned from some function. Go has panic and
recover that can be used to do the same thing, but Go programmers tend
to use more explicit error returns. To me this makes the code more
verbose but also more readable. I consider this to be a good thing,
since software readability has a serious impact on maintaining that
software. Some of the Go I have written has functional aspects, for
example a function returning a closure, but that isn't Go's primary
modus operandi.

Go also has great facilities for testing and benchmarking built in, as
well as reasonable tools for code coverage, a data race detector, a
profiler, and most of the other tools you would expect. It compiles
fast, UNLIKE Scala which takes FOREVER, and Go outputs statically
linked binaries you can drop on any box running the same basic
architecture and OS without the need to worry about JVM version blah
blah blah. How many times have I been bitten by that? Go makes it easy
to ship what you tested. Java and Scala, not so much.

Oh, and it also comes with a reasonable package manager that isn't as
hard to write as what Scala loves to use. We have a trivial shell
script that manages all external dependencies, instead of having
Scala's massively over engineered sbt, or even worse
Maven, or Ant, or even Gradle. The only other build system that even
comes close is Buck, and even that is a whole lot more to deal with
than just "go build". Done.

Go can be a little bit more verbose, but this makes it pre-eminently
readable which is more valuable to me as a maintainer of
software. This is where Go seems to shine to me. It is easy to read
other people's Go and figure out what it is doing. In
addition there are great constructs for parallelism built into the
language and great libraries already written for you. So far I am
really enjoying writing Go, and am happy to not be writing Java /
Android code for awhile. Oh, Go also has a canonical format that you
can enforce with "go format" and it always formats right. No more
arguing about white space, braces, commas etc. Go format decides, and
Go format does it "right", at least by my style standards.

So there you have it. I have taken a surprisingly delightful left turn
into the world of Go, and I am happy to stay living in this world
for some time to come.
