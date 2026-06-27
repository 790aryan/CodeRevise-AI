# 📊 CodeRevise AI Mathematical Model

## Overview

The Memory Engine models learning as a sequence of cognitive state updates.

Instead of assigning fixed revision intervals, the engine estimates how memory evolves after every review.

---

# Variables

## Retrieval Quality (RQ)

Measures the quality of today's recall.

Inputs

* Confidence
* Speed
* Hint Usage
* Result

Output

```
RQ ∈ [0,100]
```

---

## Learning Gain (LG)

Measures how much learning occurred during the review.

Depends on

* Retrieval Quality
* Retrievability

Higher retrieval quality increases learning.

Proper spacing further amplifies learning.

---

## Memory Strength (S)

Represents short-term encoding quality.

Properties

* Monotonic increase
* Bounded
* Saturating

Update

```
S_new = clamp(
S_old + f(LearningGain)
)
```

---

## Memory Stability (T)

Represents long-term resistance to forgetting.

Properties

* Monotonic increase
* Diminishing returns
* Influenced by spacing
* Influenced by difficulty

Update

```
Growth =
(StabilityMultiplier − 1)
×

√CurrentStability

T_new =
T_old + Growth
```

---

# Stability Multiplier

Depends on

* Review Result
* Retrieval Quality
* Retrievability
* Difficulty

The multiplier rewards

* difficult retrieval
* proper spacing
* harder problems

while limiting unrealistic growth.

---

# Forgetting Curve

Retention is modeled using exponential decay.

```
Retention(t)

=

exp(
−t
/
DecayConstant
)
```

The decay constant is derived from

* Strength
* Stability

Higher stability produces slower forgetting.

---

# Scheduler

Instead of assigning a predefined interval, the engine simulates future retention.

The next review is scheduled when

```
Retention

≤

Target Threshold
```

This produces adaptive revision intervals.

---

# Design Properties

The model guarantees

* bounded growth
* monotonic memory strengthening
* diminishing returns
* adaptive scheduling
* numerical stability

---

# Validation

Every update to the mathematical model is validated against the benchmark suite.

Current benchmark coverage

* Perfect Recall
* Failed Recall
* Cramming
* Delayed Recall
* Difficulty Scaling
* Long-Term Stability

Only changes that preserve benchmark behavior are accepted into the main branch.

---

# Future Research Directions

* Personalized forgetting curves
* Bayesian memory estimation
* Topic-level stability vectors
* Reinforcement-learning scheduling
* AI-assisted cognitive modeling
