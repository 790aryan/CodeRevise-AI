# 🧪 CodeRevise AI Benchmark Suite

## Purpose

The benchmark suite validates behavioral properties of the Memory Engine.

Unlike traditional unit tests that verify individual functions, these benchmarks verify that the complete memory model behaves correctly.

---

# Benchmark Philosophy

The benchmark suite answers questions such as:

* Does successful recall strengthen memory?
* Does failed recall preserve prior learning?
* Is cramming discouraged?
* Does delayed retrieval produce larger gains?
* Does difficulty influence stability?
* Does the engine remain numerically stable over long-term use?

---

# Current Benchmarks

## 1. Perfect Recall

Purpose

Verify that a perfect review schedules the next review within the expected range.

Expected

```
Review Day ≈ 2–4
```

---

## 2. Failed Recall

Purpose

Verify that a failed review weakens memory without destroying it.

Expected

```
Memory decreases modestly
```

---

## 3. Cramming

Purpose

Verify that reviewing too soon provides less learning than reviewing after appropriate spacing.

Expected

```
LearningGain(spaced)
>

LearningGain(crammed)
```

---

## 4. Delayed Recall

Purpose

Verify that successful retrieval after forgetting produces greater stability growth.

Expected

```
Stability(delayed)
>

Stability(immediate)
```

---

## 5. Difficulty Scaling

Purpose

Verify that harder problems produce greater stability growth.

Expected

```
Hard

>

Medium

>

Easy
```

---

## 6. Long-Term Stability

Purpose

Simulate 100 reviews.

Verify

* Strength increases
* Stability increases
* Review intervals increase
* No oscillation
* No numerical explosion

---

# Regression Testing

Every algorithm change must satisfy all benchmarks before being merged.

```
Developer

↓

Modify Formula

↓

Run Benchmark Suite

↓

PASS

↓

Merge
```

---

# Future Benchmarks

* Random learner simulation
* Fast learner
* Slow learner
* Forgetful learner
* Mixed difficulty sessions
* Adaptive scheduling
* Topic-specific memory evolution

---

# Goal

The benchmark suite protects the Memory Engine against regressions while enabling future research and experimentation.
