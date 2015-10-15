---
title: 'Why Buck is Awesome!'
date: '2014-05-22'
widgets :
  google_prettify :
    linenums : false
    theme : desert
tags: ['buck', 'awesome']
categories: ['build']
layout: 'post'
permalink: '/posts/why-buck-is-awesome'
---

Let's face it. <a href="http://facebook.github.io/buck/">Buck is Awesome!</a>

Buck's amazing features include:

* <a href="/posts/why-buck-is-awesome#non-recursive">Non-recursive</a>
* <a href="/posts/why-buck-is-awesome#file-based">File based instead of task based</a>
* <a href="/posts/why-buck-is-awesome#fast">Fast!</a>
* <a href="/posts/why-buck-is-awesome#extensible">Extensible.</a>
* <a href="/posts/why-buck-is-awesome#easy">Easy to use.</a>
* <a href="/posts/why-buck-is-awesome#really-fast">Really really fast! No really!</a>
* <a href="/posts/why-buck-is-awesome#cool-output">Buck has cool output while building</a>

I recently began experimenting with Buck as replacement for the usual
<a href="http://ant.apache.org/">Ant</a> based build system in Android,
and the only conclusion that I can draw is that buck is awesome.

While it is true the Android guys have thrown their weight behind <a
href="http://tools.android.com/tech-docs/new-build-system/user-guide">Gradle</a>
I really prefer the approach that Buck has taken.

Gradle still has some serious <a
href="https://code.google.com/p/android/issues/detail?id=52962">bugs
with how it deals with library projects</a> that prevent me from
moving to Gradle full time. While the number of awesome plugins to
Gradle is increasing, which makes it more attractive, I have found the
learning curve on Gradle to be much steeper. In many ways I feel like
Gradle is a reimplementation of Maven with many of the same warts.
And while I think that Android Studio is a much better IDE for
building Android code, Buck is simply a better build system for my
needs.

Buck is patterned after <a
href="http://google-engtools.blogspot.com/2011/08/build-in-cloud-how-build-system-works.html">Blaze
from Google</a> and is a re-implementation targeted at building java
and android projects. Facebook has the largest Android code base in
the world and they build everything out of one repository. The fact
that they are using Buck to build their code base is a strong
endorsement. Being patterned after Google's build system can't hurt
either.

<a name="non-recursive"></a>
<h2>Buck is Not Recursive</h2>

Buck is awesome because it doesn't use a recursive build
system. Period.  Recursive build is bad. I have thought so since I
read <a href="http://miller.emu.id.au/pmiller/books/rmch/">Peter
Miller's canonical paper on the subject.</a> I redid a large C project
I was working on following his paper as a guide and ended up with more
reliable builds that went faster. Win!

<a name="file-based"></a>
<h2>Buck is File Based</h2>

Buck follows a file based approach to building. It doesn't rely on
timestamps like Make does. Instead it uses hashes of files to determine
if a file changed. This means it is not subject to the vagaries of
clocks. It also means that Buck can do smart caching. It can tell if
any downstream file needs to be rebuilt based on the hash of the
upstream file. This also means that it is very good at figuring out
what doesn't need to be rebuilt and using cached versions, making
incremental builds much faster.

It also doesn't have Ant's "do this, then do that" task structure
which makes you think about how to build instead of what to build.
Focusing on what to build makes writing build files much easier.
It also makes it much easier for Buck to cache things, since
it knows how to transform the input files into the output. With
Ant's task based setup Ant has to run many tasks that are not
necessary in order to run a build.

<a name="fast"></a>
<h2>Buck is Fast!</h2>

Buck is awesome because Buck is fast.  <a
href="http://blog.ltgt.net/in-quest-of-the-ultimate-build-tool/">Thomas
Broyer</a> did some quick comparisons with maven and found that buck
is faster than maven.

I have run a similar <b>non benchmark</b> against Gradle over our
fairly large project setup involving many library projects. My results
represent a typical developer machine with a bunch of other apps running
but is in no way a benchmark. I'm not sure one is needed though.

~~~
$ ./gradlew clean
$ time ./gradlew build -p one-of-our-apps

real	3m22.099s
user	7m41.103s
sys	0m58.628s

$ time ./gradelw build -p one-of-our-apps

real	0m20.768s
user	0m45.762s
sys	0m2.593s

$ ./gradlew clean
$ time ./gradlew --parallel build -p one-of-our-apps
Parallel execution is an incubating feature.

real	3m18.475s
user	7m46.713s
sys	1m1.647s

$ time ./gradlew --parallel build -p one-of-our-apps
Parallel execution is an incubating feature.

real	0m20.454s
user	0m51.110s
sys	0m3.066s

$ buck clean
$ time buck build one-of-our-apps

real	0m56.374s
user	3m11.263s
sys	0m6.643s

$time buck build one-of-our-apps

real	0m3.821s
user	0m5.185s
sys	0m0.739s

~~~

That's not just faster, that's a whole hell of a lot faster! Note that
Gradle's --parallel option didn't really help a lot on this codebase.

Maybe --parallel would help on other code bases, but I expect that since they
don't execute multiple tasks within the same project they don't have
nearly as much win as Buck does in the parallel game.

And with Shawn Pierce having moved <a
href="https://gerrit-review.googlesource.com/#/c/54821/">Gerrit to
using Buck</a>, you can be sure that buck is mature enough for a
serious project.

<a name="really-fast"></a>
<h2>Buck is Really Fast!</h2>

Because Buck is using file based hashing, Buck also has the ability to
be connected to a <a href="http://cassandra.apache.org/">Cassandra
instance</a> for distributed caching. This means that if a team of
developers is all working on the same project, if anybody has ever
built that artifact with that set of dependencies you can download the
cached version from them instead of building it yourself. On a fast
network, you can start to see how Buck could be really awesome at the
Facebook scale of development.

<a name="easy"></a>
<h2>Buck is Easy to Use</h2>

Buck is pretty easy to use too. I was able to convert our extensive
build system to use buck much faster than I was able to convert to
Gradle, even with the Eclipse export option. The export option barely
worked, and I spent forever chasing down issues. Not to mention
that Gradle wants you to reorganize you source tree from the way that
Eclipse does it. If you still need to support Eclipse, you are
left to jump through Gradle hoops to get everything working, and
you can't take advantage of all of Gradle's features.

Buck on the other hand was pretty easy to setup. I just had to
think through the files that buck needed to build and tell
Buck how to build those. For my way of thinking about building
it was super easy. Specify the files that make up the artifact
and any dependent artifacts and you are done.

I also recently made use of Bucks <a
href="http://facebook.github.io/buck/function/include_defs.html">include_defs()</a>
feature in our build system which allowed me to reduce many of our
build files to a single declaration. We have a lot of library projects
and applications which are all built in similar ways with similar file
structures. In most cases I now have simple declarations like for
library projects. Apps are only slightly more complicated for
specifying the AndroidManifest.xml file.

```python
android_library_project(
    name = 'some-library-project',
    package = 'some.library.project.package',
    srcs = glob(['src/main/java/**/*.java']),
    deps = ['//some-other-library-project:some-other-library-project'],
    )
~~~

If that isn't easy to use, I don't know what is!

In addition it is easy to use Buck from the command line. Targets are
named based on the directory they are in, and if your BUCK file has a
target with the same name as the directory then it is used as the
default target. This means you can use tab completion to specify most
targets you want. Want a debug version? Tab complete the directory,
delete the slash and add :debug! (Assuming your debug target is named
debug within your BUCK file, which I suggest.)

<a name="extensible"></a>
<h2>Buck is Extensible</h2>

Buck is also pretty easy to hack on. I wanted to find out how easy, so
I <a href="https://github.com/facebook/buck/pull/95">solved one of my
own pain points</a> of generating BuildConfig.java files. I had
previously solved this with a little python, but cracking open the
Buck source was surprisingly easy. That change set took just half a
day to put together.

But the fact that I could previously solve the issue using python is
another strength of Buck. It is easily extensible without having
to touch the Buck source code.

<a href="https://github.com/davido/bucklets">Bucklets</a> are a
prefect example. Some have criticized Buck for not including the
ability to download external dependencies or use jars out of the local
maven repository. But using just Buck's build files the Bucklets
project has added those features without having to touch Buck source
code. That's just awesome!

I have yet to update our buck system to using the maven_jar task,
since we are still supporting Ant anyway so we need a copy of
dependencies in the lib dir, but it is certainly on my list of things
to do. I can even see it being relatively easy to write a BUCK build
task to generate build.gradle files. I have also used the
```include_defs()``` feature as outlined above to further customize
and simplify our build system. And simplifying writing build files
is awesome.

<a name="cool-output"></a>
<h2>Buck has Cool Output While Building</h2>

The last thing that is really awesome about Buck is the super cool
parallel build display it shows you while you are building. It
shows you how many executors it is using, with one on each line,
and displays what each executor is doing, and how long it has
been doing it for.

~~~
$ buck build some-app
[-] PARSING BUILD FILES...FINISHED 1.5s
[+] BUILDING...0.7s
 |=> //crashlytics:crashlytics#dummy_r_dot_java...  0.3s (running javac[0.1s])
 |=> //android-support-v7-appcompat:res...  0.7s (running aapt_package[0.4s])
 |=> //google-play-services_lib:google-play-services_lib#dummy_r_dot_java...  0.1s (running javac[0.0s])
 |=> //crashlytics:crashlytics-lib#dummy_r_dot_java...  0.3s (running javac[0.2s])
 |=> //native-library-project/jni:libnative_sd...  0.6s (running ndk_build[0.4s])
 |=> //some-app:app_manifest...  0.3s (running generate_manifest[0.3s])
 |=> //some-library:res...  0.7s (running aapt_package[0.5s])
 |=> //google-play-services_lib:google-play-services-jar...  0.7s (running get_class_names[0.5s])
 |=> //some-app:crashlytics_res...  0.7s (running genrule[0.6s])
 |=> //some-library:guava...  0.5s (running get_class_names[0.4s])
~~~

It has colors and everything that you can't see here now. There is an
<a href="http://facebook.github.io/buck/">animated gif with this on
the Buck homepage</a>, so check it out to see it in action. It's awesome!

In conclusion, Buck is awesome. Use it to make your build system
suck less.
