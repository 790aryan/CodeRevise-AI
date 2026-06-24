# Problem Domain Foundation

## Scope

This phase defines the data architecture for topics, problems, and user problem attempts. It does not add controllers, routes, API endpoints, revision scheduling, analytics, AI, cron jobs, or protected-route behavior.

## Topic Model

`Topic` represents a DSA concept such as Arrays, Binary Search, Dynamic Programming, Graphs, Trees, Trie, or Bit Manipulation. Topics are stored separately from problems so the platform can normalize concepts across LeetCode and Codeforces.

The unique `slug` gives future imports and analytics a stable machine-friendly identifier. The unique `name` prevents duplicated concepts that differ only by casing or spacing.

## Problem Model

`Problem` represents a coding problem from a supported platform. It stores the platform identity, canonical URL, difficulty, premium flag, active flag, and topic references.

`platform + platformProblemId` is unique so repeated imports do not create duplicate problems. Difficulty and topic indexes prepare the domain for filtering, learning roadmaps, and readiness scoring.

## ProblemAttempt Model

`ProblemAttempt` represents a user's current aggregate interaction with one problem. It connects `User` to `Problem` and stores status, attempt counts, time spent, notes, mistake type, and recent attempt timestamps.

The `userId + problemId` unique index keeps one progress record per user/problem. Later phases can add separate event histories if the product needs every individual submission or revision event.

## Relationships

- One `Problem` can belong to many `Topic` records.
- One `Topic` can be linked to many `Problem` records.
- One `User` can have many `ProblemAttempt` records.
- One `Problem` can have many `ProblemAttempt` records across users.
- One `ProblemAttempt` belongs to exactly one `User` and one `Problem`.

## Future Use Cases

Revision engine: `ProblemAttempt.status`, timestamps, mistake type, and counts provide the starting signal for deciding which problems should enter revision.

AI recommendations: notes, mistake types, topics, and difficulty give AI features structured context without requiring raw route-level logic in this phase.

Weak topic detection: problem-topic relationships plus per-user attempts let analytics identify topics with repeated attempts, mistakes, or low solve counts.

Interview readiness scoring: difficulty, topics, solve status, successful attempts, and time spent can feed readiness factors such as coverage, independence, and difficulty progression.

Progress tracking: attempts provide a compact per-user progress record for dashboards before deeper revision and analytics collections are introduced.
