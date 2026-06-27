# 🏗️ CodeRevise AI Architecture

## System Overview

CodeRevise AI is an adaptive DSA learning platform that combines traditional problem solving with a cognitive memory engine.

The system is organized into independent modules with clearly defined responsibilities.

```
                Frontend (React)
                      │
                      ▼
            REST API (Express)
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
 Revision Engine              Dashboard Engine
        │                           │
        └─────────────┬─────────────┘
                      ▼
                Memory Engine
                      │
      ┌───────────────┼────────────────┐
      ▼               ▼                ▼
 Retrieval      Learning Gain     Memory Update
 Quality                              │
                                      ▼
                           Retention Simulator
                                      │
                                      ▼
                           Revision Recommendation
                                      │
                                      ▼
                                MongoDB
```

---

# Backend Modules

## Authentication

Responsibilities

* Registration
* Login
* JWT
* Refresh Tokens

---

## Problem Management

Responsibilities

* CRUD
* Metadata
* Topics
* Difficulty
* Platform Links

---

## Revision Engine

Responsibilities

* Review submission
* Revision scheduling
* Memory engine invocation
* Topic updates
* Statistics

---

## Memory Engine

Responsibilities

* Retrieval Quality
* Learning Gain
* Memory Update
* Retention Simulation
* Next Review Prediction

This module is intentionally isolated so that future algorithm improvements do not affect the rest of the application.

---

## Dashboard

Responsibilities

* User analytics
* Streaks
* Progress
* Memory trends
* Revision calendar

---

# Design Principles

## Single Responsibility

Every service owns one responsibility.

## Modularity

Each module communicates through public APIs rather than internal implementation details.

## Extensibility

New scoring algorithms or scheduling policies can be introduced without changing controllers.

## Testability

Behavior is validated using benchmark scenarios rather than relying only on unit tests.

---

# Data Flow

```
Review Event
      │
      ▼
Revision Engine
      │
      ▼
Memory Engine
      │
      ▼
Updated Memory State
      │
      ▼
Database
      │
      ▼
Dashboard Analytics
```

---

# Future Expansion

* AI Coach
* Adaptive learner profiles
* Topic-level cognitive modeling
* Predictive mastery analytics
* Reinforcement-learning scheduling

---

# Architecture Goals

* High cohesion
* Low coupling
* Easy testing
* Clear separation of concerns
* Scalable feature development
