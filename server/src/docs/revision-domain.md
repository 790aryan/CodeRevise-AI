# Revision Domain Foundation

## Scope

This phase defines the persistence and validation foundation for future revision features. It does not implement controllers, routes, API endpoints, scheduling algorithms, cron jobs, notification systems, analytics calculations, AI integrations, or authentication changes.

## RevisionSchedule Purpose

`RevisionSchedule` stores the current revision state for one user and one problem. It holds the current interval, next revision date, last revision date, revision counts, last result, status, and active flag.

The model is intentionally state-oriented. Future scheduling algorithms can update a single schedule record after each revision event without scanning every historical session.

## RevisionSession Purpose

`RevisionSession` stores one completed revision event. It captures the user, problem, schedule, session type, result, duration, notes, feedback, and completion date.

The model is intentionally event-oriented. It preserves historical evidence for future retention, weak-topic detection, AI review summaries, and readiness scoring.

## Relationships

- One `User` can have many `RevisionSchedule` records.
- One `Problem` can have many `RevisionSchedule` records across users.
- One `RevisionSchedule` belongs to exactly one `User` and one `Problem`.
- One `RevisionSchedule` can have many `RevisionSession` records.
- One `RevisionSession` belongs to one `User`, one `Problem`, and one `RevisionSchedule`.

## Future Spaced Repetition Use

Future spaced-repetition logic can read `currentIntervalDays`, `nextRevisionAt`, `lastRevisionResult`, `revisionCount`, and `successfulRevisionCount` to decide the next interval. The interval constants are stored centrally, but no scheduling algorithm is implemented in this phase.

## Future AI Recommendation Use

AI recommendations can use `notes`, `feedback`, `result`, `durationMinutes`, and session type to understand how a user performed during revision. `ai_recommended` session type is available as a future attribution signal without implementing any AI behavior now.

## Future Weak-Topic Detection

Revision sessions can be joined through problems and topics to identify repeated hard or again results in specific areas. Schedules provide the current state, while sessions provide historical evidence.

## Future Interview Readiness Scoring

Readiness scoring may use successful revision count, revision recency, result distribution, and consistency of completed sessions as durability signals. These models provide those raw inputs without calculating analytics in this phase.
