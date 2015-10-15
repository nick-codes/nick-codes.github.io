---
title: 'on-covariance-and-contravariance'
date: '2014-05-21'
description:
tags: []
---


Covariant: a Cat[] is an Animal[]
Contravariant: an Animal[] is a Cat[]
Invaraient: neither is true

Read-only data types (sources) can be covariant; write-only data types (sinks) can be contravariant.
Mutable data types which act as both sources and sinks should be invariant.
But Java arrays are not invariant.
Instead they throw a ArrayStoreException if you violate invariance.

List<? extends Animal> or List<? super Animal>
The easiest way to remember these are as producers and consumers.
PECS - Producers Extend, Consumers Super
Extend is covariant.
Super is contravarient.
Everything else should be invariant.

The compromises of Type Erasure.
