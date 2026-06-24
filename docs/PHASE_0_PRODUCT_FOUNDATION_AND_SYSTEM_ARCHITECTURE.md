# CodeRevise AI - Phase 0 Product Foundation and System Architecture

## Section 1 - Product Overview

### What The Platform Does

CodeRevise AI is a revision operating system for competitive programming and technical interview preparation. It helps users record solved and attempted problems, capture mistakes, schedule future revision, measure retention, understand weak topics, and receive AI-generated guidance.

The platform is not intended to replace LeetCode or Codeforces as problem-solving platforms. Its role is to sit above them as a memory, analytics, and coaching layer.

### Target Users

1. Competitive programmers who solve Codeforces problems and want topic-level progress tracking.
2. Interview candidates preparing with LeetCode, Codeforces, or custom problem lists.
3. Students who repeatedly forget previously solved patterns.
4. Self-directed learners who need structured revision plans instead of only raw problem counts.
5. Advanced users who want retention analytics, weak-area detection, and readiness scoring.

### Main User Journeys

1. A new user signs up, selects preparation goals, chooses preferred topics, and imports or manually adds problems.
2. A user solves a problem and records the result, time taken, difficulty, mistakes, editorial usage, and notes.
3. The revision engine schedules the problem for future review based on performance and feedback.
4. Each day, the user opens a revision plan, revises due problems, and submits recall feedback.
5. The analytics engine updates retention, mastery, weak topics, readiness, streaks, and weekly trends.
6. The AI engine converts notes and attempt metadata into root-cause insights and next-step recommendations.
7. The user optionally shares a public profile with selected progress stats.

### Core Value Proposition

CodeRevise AI turns scattered practice into a measurable learning loop:

- Practice becomes tracked.
- Mistakes become reusable learning assets.
- Revision becomes scheduled instead of random.
- Weak topics become visible.
- Interview readiness becomes explainable.
- AI insights become grounded in actual attempts rather than generic advice.

### Competitive Advantages Over LeetCode And Codeforces

LeetCode and Codeforces are excellent problem sources, but their core design favors solving and ranking, not long-term retention. CodeRevise AI differentiates through:

- Spaced repetition for coding problems.
- Mistake-centric tracking instead of only accepted submissions.
- Retention scoring that decays over time and reacts to revision feedback.
- Topic mastery based on success, failure, difficulty, editorial dependence, and revision performance.
- Interview readiness scoring across coverage, consistency, independence, and difficulty progression.
- AI analysis based on user-specific notes and patterns.
- Public profiles focused on learning quality, not only rating or solved count.

## Section 2 - Complete Feature Inventory

### Authentication

#### Email And Password Sign Up

Purpose: Let users create private accounts.

Inputs: Name, email, password, timezone, optional preparation goal.

Outputs: Authenticated user session and initialized user profile.

Edge cases: Duplicate email, weak password, disposable email, invalid timezone, partially created account, abandoned onboarding.

Dependencies: User collection, password hashing, session or token system, validation layer.

#### Login And Logout

Purpose: Allow secure account access and session termination.

Inputs: Email and password.

Outputs: Auth token/session, user context, last login activity.

Edge cases: Wrong password, locked account, deleted user, stale token, login from unusual location.

Dependencies: Authentication middleware, User collection, ActivityLog.

#### Password Reset

Purpose: Recover account access.

Inputs: Email, reset token, new password.

Outputs: Updated password and invalidated reset token.

Edge cases: Expired token, reused token, account not found, reset email delivery failure.

Dependencies: Nodemailer, token storage, User collection.

#### Profile And Preferences

Purpose: Store timezone, goals, public visibility, reminder settings, and topic preferences.

Inputs: Timezone, reminder time, target interview date, preferred platforms, privacy choices.

Outputs: Updated personalization data.

Edge cases: User changes timezone, invalid reminder time, removing a platform after syncing problems.

Dependencies: User, PublicProfileSettings, scheduling system.

### Problem Management

#### Manual Problem Tracking

Purpose: Let users add problems from any source.

Inputs: Title, platform, URL, difficulty, topics, status, notes, time taken.

Outputs: Problem record and optional initial attempt.

Edge cases: Duplicate URL, missing difficulty, custom platform, same title across platforms, invalid URL.

Dependencies: Problem, Attempt, TopicStats.

#### Problem Search And Filtering

Purpose: Help users find tracked problems.

Inputs: Search text, platform, topic, status, difficulty, revision state.

Outputs: Paginated list of matching problems.

Edge cases: Large result sets, inconsistent topic names, deleted problems with remaining attempts.

Dependencies: Problem indexes, normalized topics.

#### Attempt Logging

Purpose: Capture each solve or revision attempt.

Inputs: Problem ID, status, time taken, language, notes, mistakes, editorial usage.

Outputs: Attempt record and updated analytics.

Edge cases: Attempt without problem, negative time, unknown status, duplicate submission import.

Dependencies: Attempt, MistakeNote, RevisionSchedule, TopicStats.

#### Codeforces Sync

Purpose: Import Codeforces submission history and problem metadata.

Inputs: Codeforces handle and sync request.

Outputs: Imported problems, attempts, and sync summary.

Edge cases: Invalid handle, private or unavailable data, Codeforces API downtime, duplicate submissions, changed problem tags.

Dependencies: External Codeforces API, Problem, Attempt, ActivityLog.

### Revision System

#### Daily Revision Plan

Purpose: Generate a focused list of due and high-priority problems.

Inputs: User timezone, due schedules, priority scores, daily capacity.

Outputs: DailyRevisionPlan with ordered revision items.

Edge cases: No due problems, too many due problems, skipped previous days, timezone change, duplicate plan generation.

Dependencies: RevisionSchedule, Problem, DailyRevisionPlan, node-cron.

#### Revision Feedback

Purpose: Update memory estimates after each revision.

Inputs: Revision item, feedback state, time taken, optional notes.

Outputs: Updated schedule, attempt, retention, topic stats, activity log.

Edge cases: Feedback submitted twice, skipped item, problem deleted, offline client retry.

Dependencies: RevisionSchedule, Attempt, Retention engine, TopicStats.

#### Suspended Problems

Purpose: Prevent unsuitable problems from repeatedly polluting revision plans.

Inputs: User action or automatic suspension trigger.

Outputs: Problem excluded from normal due queue until resumed.

Edge cases: Accidental suspension, suspended weak topic hiding true weakness, resuming after long gap.

Dependencies: RevisionSchedule, Problem.

### AI Features

#### Mistake Analysis

Purpose: Convert raw notes into structured insight.

Inputs: Notes, status, time taken, topics, difficulty, editorial usage.

Outputs: Root cause, weak topic, next steps, recommended revision action.

Edge cases: Empty notes, vague notes, unsafe prompt content, Groq timeout, hallucinated topics.

Dependencies: Groq API, Attempt, MistakeNote.

#### Weekly AI Summary

Purpose: Give users a concise report on progress and next focus areas.

Inputs: Weekly attempts, retention changes, weak topics, revision outcomes.

Outputs: Summary, key wins, risks, next-week priorities.

Edge cases: Too little data, API failure, user inactivity, conflicting signals.

Dependencies: WeeklyReport, Groq API, analytics engine.

#### Roadmap Suggestions

Purpose: Recommend topic and difficulty progression.

Inputs: Mastery scores, interview goal, weak topics, solved history.

Outputs: Prioritized roadmap.

Edge cases: User only solves one topic, user goal date too close, inflated solved count from easy problems.

Dependencies: TopicStats, Interview readiness engine, AI engine.

### Analytics

#### Retention Dashboard

Purpose: Show how well users remember prior problems.

Inputs: Revision outcomes, elapsed time, difficulty, confidence.

Outputs: Overall and topic-level retention estimates.

Edge cases: New user, old unscheduled problems, skipped revisions, small sample size.

Dependencies: Attempt, RevisionSchedule, TopicStats.

#### Topic Mastery

Purpose: Rank strengths and weaknesses.

Inputs: Solves, failures, difficulty, editorial usage, revision success.

Outputs: Mastery score per topic with confidence.

Edge cases: Topic aliases, multi-topic problems, small topic sample, easy-only inflation.

Dependencies: Problem topics, Attempt, RevisionSchedule.

#### Interview Readiness

Purpose: Give an explainable readiness score.

Inputs: Coverage, mastery, retention, consistency, difficulty, editorial independence, contest data.

Outputs: Score, confidence, breakdown, recommendations.

Edge cases: No contest data, narrow topic coverage, high solved count with low retention.

Dependencies: TopicStats, Attempt, WeeklyReport.

### Gamification

#### XP

Purpose: Reward meaningful learning actions.

Inputs: Solves, revisions, mistake notes, streak actions.

Outputs: XP balance and level.

Edge cases: Repeated trivial edits, farming skipped revisions, bulk imported submissions.

Dependencies: ActivityLog, Attempt.

#### Streaks

Purpose: Encourage consistent revision.

Inputs: Daily completed learning activity.

Outputs: Current streak, longest streak, streak freeze eligibility.

Edge cases: Timezone changes, late-night users, server downtime, minimal fake actions.

Dependencies: ActivityLog, User timezone.

#### Badges

Purpose: Celebrate milestones and behavior quality.

Inputs: Solved count, revision consistency, topic mastery, editorial independence.

Outputs: Earned badges.

Edge cases: Imported history granting too many badges, badge revocation, duplicate awards.

Dependencies: ActivityLog, TopicStats.

### Public Profiles

#### Shareable Profile

Purpose: Let users show progress publicly.

Inputs: Visibility settings, username, selected stats.

Outputs: Public profile page.

Edge cases: Private notes leaking, deleted account, username squatting, hidden stats causing misleading summaries.

Dependencies: PublicProfileSettings, User, aggregated analytics.

#### Privacy Controls

Purpose: Let users control what is visible.

Inputs: Visibility toggles for stats, platforms, streaks, solved count, weak topics.

Outputs: Public-safe projection of user data.

Edge cases: Cached private data, URL sharing after disabling profile, search indexing.

Dependencies: PublicProfileSettings, cache invalidation.

### Notifications

#### Daily Revision Reminder

Purpose: Bring users back when revisions are due.

Inputs: User timezone, reminder preference, due count.

Outputs: Email reminder.

Edge cases: No due items, invalid email, duplicate emails, unsubscribe request.

Dependencies: node-cron, Nodemailer, RevisionSchedule.

#### Weekly Report Email

Purpose: Deliver weekly progress summary.

Inputs: WeeklyReport, user preference.

Outputs: Email summary.

Edge cases: Report not generated, user inactive, email bounce.

Dependencies: WeeklyReport, Nodemailer.

### Administration

#### User And System Monitoring

Purpose: Track system health and suspicious use.

Inputs: API logs, sync failures, AI failures, email failures.

Outputs: Admin dashboard metrics and alerts.

Edge cases: Sensitive data exposure, noisy alerts, false abuse positives.

Dependencies: ActivityLog, operational logs.

#### Content And Topic Normalization

Purpose: Maintain consistent topic names and platform mappings.

Inputs: Raw tags from users and platforms.

Outputs: Normalized topic taxonomy.

Edge cases: Over-merging distinct concepts, user custom topics, platform tag drift.

Dependencies: Problem, TopicStats.

## Section 3 - User Flows

### 1. New User Onboarding

1. User signs up with email, password, and display name.
2. Platform validates credentials and creates a private user profile.
3. User selects goal: interview preparation, competitive programming, or general revision.
4. User selects target platforms: LeetCode, Codeforces, both, or manual.
5. User sets timezone and reminder preference.
6. User chooses target topics or accepts default topic coverage.
7. Platform initializes profile settings, empty analytics, and notification preferences.
8. User is guided to add a first problem or connect Codeforces.

Reasoning: Onboarding must capture only data that changes the system behavior. Too many fields reduce completion. Goal, timezone, and platform preferences directly affect scheduling, reporting, and analytics.

Edge cases: User skips onboarding, user enters wrong timezone, user wants no reminders, user has no solved problems yet.

### 2. Manual Problem Tracking

1. User opens Add Problem.
2. User enters title, platform, URL, difficulty, topics, and solve status.
3. If solved or attempted, user adds time taken, notes, mistakes, and editorial usage.
4. Platform checks for duplicates by URL, platform identifier, and title similarity.
5. Platform creates or updates the Problem.
6. Platform creates an Attempt if attempt details were provided.
7. Revision engine creates an initial schedule when the problem is solved or meaningfully attempted.
8. Analytics update topic stats and dashboard summaries.

Reasoning: The platform should not require perfect metadata before tracking. Users often remember the mistake better than the exact tag, so the design permits partial records while nudging toward better data.

Edge cases: Same problem added twice, problem has multiple topics, user adds unsolved problem for later, difficulty unknown.

### 3. Codeforces Sync

1. User enters Codeforces handle.
2. Platform validates the handle and fetches recent submissions.
3. Platform maps each submission to a normalized problem identity.
4. Platform deduplicates existing problems and attempts.
5. Accepted submissions create solved attempts.
6. Failed submissions create failed attempts if useful for analytics.
7. Topic tags and difficulty are imported when available.
8. Sync summary shows imported, skipped, updated, and failed items.

Reasoning: Sync must be idempotent. Re-running sync should not duplicate attempts or corrupt analytics.

Edge cases: API unavailable, handle renamed, submissions without rating, repeated wrong submissions, contest problem tags changing later.

### 4. Revision Workflow

1. User opens Today's Revision.
2. Platform shows due problems ordered by priority.
3. User attempts recall before opening editorial or solution.
4. User marks feedback: Remembered Easily, Remembered With Effort, Forgot, Used Editorial, or Skipped.
5. Platform records revision attempt metadata.
6. Revision engine updates retention estimate, next interval, due date, and priority.
7. Topic mastery and readiness scores update.
8. Completed items are removed from today's active queue.

Reasoning: Feedback states must represent memory quality, not just correctness. A correct answer with heavy effort is different from effortless recall.

Edge cases: User accidentally submits feedback, user revises after midnight, due item deleted, user skips all items.

### 5. AI Analysis Workflow

1. User records an attempt or revision with notes.
2. Platform checks whether enough signal exists for AI analysis.
3. Prompt is built from structured metadata and sanitized user notes.
4. Groq returns root cause, weak topic, next steps, and revision suggestion.
5. Platform validates output shape and stores structured insight.
6. User can accept, edit, or dismiss the insight.
7. Accepted insights influence weekly summaries and roadmap recommendations.

Reasoning: AI output should assist analysis, not silently rewrite user data. User review protects trust and reduces hallucination impact.

Edge cases: Empty notes, offensive or prompt-injection notes, API timeout, inconsistent model output.

### 6. Weekly Report Workflow

1. Weekly job identifies each user's local week boundary.
2. Platform gathers attempts, revisions, retention changes, streaks, topic movement, and weak areas.
3. Analytics engine computes deterministic metrics.
4. AI engine optionally summarizes patterns and recommendations.
5. WeeklyReport is stored with generated_at, period_start, and period_end.
6. Email reminder sends if enabled.
7. User opens report from dashboard or email.

Reasoning: Deterministic metrics must exist even if AI fails. The weekly report should be reliable as a product feature, with AI as enrichment.

Edge cases: User changes timezone midweek, duplicate cron execution, no activity, email failure.

### 7. Public Profile Workflow

1. User chooses a public username.
2. User selects which stats are visible.
3. Platform validates username uniqueness and reserved names.
4. Public-safe aggregate data is generated.
5. Visitor opens shareable URL.
6. Platform serves only allowed fields.
7. User can disable profile at any time.

Reasoning: Public profiles should advertise progress without exposing private mistakes, notes, emails, or exact learning vulnerabilities unless explicitly allowed.

Edge cases: Cached profile after disabling, username changes, hidden weak topics, account deletion.

## Section 4 - Database Collection Planning

### User

Purpose: Owns authentication, preferences, and high-level account data.

Key fields: email, password hash, display name, timezone, goals, reminder preferences, Codeforces handle, created_at, last_login_at, account status.

Relationships: One User has many Problems, Attempts, RevisionSchedules, Reports, ActivityLogs, and TopicStats.

Indexes required: unique email, optional unique Codeforces handle per active linked account, account status, created_at.

Potential future issues: Email changes require re-verification. Timezone changes can affect streak and schedule history. Deleting users must cascade or anonymize dependent records.

### Problem

Purpose: Stores user-tracked problem identity and metadata.

Key fields: user_id, platform, platform_problem_id, title, URL, difficulty, normalized topics, custom tags, status, source metadata, archived flag.

Relationships: One Problem belongs to one User and has many Attempts, MistakeNotes, and RevisionSchedules.

Indexes required: user_id plus platform, user_id plus URL, user_id plus topics, user_id plus status, user_id plus difficulty.

Potential future issues: Same public problem may be duplicated across users. A future global problem catalog may reduce duplication but adds migration complexity.

### Attempt

Purpose: Records a solve, failed solve, imported submission, or revision attempt.

Key fields: user_id, problem_id, attempt_type, status, time_taken, language, editorial_used, feedback_state, notes summary, attempted_at, source submission ID.

Relationships: Belongs to User and Problem. May generate MistakeNotes and ActivityLogs.

Indexes required: user_id plus attempted_at, problem_id plus attempted_at, user_id plus status, user_id plus attempt_type.

Potential future issues: Imported Codeforces submissions can be numerous. Attempts should support pagination and aggregation without scanning full history.

### RevisionSchedule

Purpose: Tracks spaced repetition state per problem.

Key fields: user_id, problem_id, state, due_at, interval_days, ease_factor, retention_estimate, lapse_count, skip_count, last_feedback, last_reviewed_at, suspended_until.

Relationships: Belongs to User and Problem. Consumes Attempt data.

Indexes required: user_id plus due_at, user_id plus state, problem_id unique active schedule, user_id plus priority inputs.

Potential future issues: Multiple schedules per problem may be useful later for subskills, but initially one active schedule per problem is simpler and safer.

### MistakeNote

Purpose: Stores structured mistakes and learning notes.

Key fields: user_id, problem_id, attempt_id, category, raw_note, normalized_root_cause, weak_topic, AI confidence, created_at.

Relationships: Belongs to User, Problem, and optionally Attempt.

Indexes required: user_id plus created_at, user_id plus weak_topic, problem_id.

Potential future issues: User notes are sensitive. Public profiles must never expose raw notes by default.

### TopicStats

Purpose: Stores aggregate topic-level analytics for fast dashboard queries.

Key fields: user_id, topic, solved_count, failed_count, revision_count, success_count, editorial_count, retention, mastery, confidence, last_updated_at.

Relationships: Belongs to User. Derived from Problems, Attempts, and RevisionSchedules.

Indexes required: user_id plus topic unique, user_id plus mastery, user_id plus retention.

Potential future issues: Aggregates can drift from source events. Need rebuild jobs or consistency checks.

### DailyRevisionPlan

Purpose: Stores generated daily plan and completion state.

Key fields: user_id, local_date, timezone, item problem IDs, planned_count, completed_count, skipped_count, generated_at, finalized_at.

Relationships: Belongs to User and references Problems/RevisionSchedules.

Indexes required: user_id plus local_date unique, user_id plus generated_at.

Potential future issues: Timezone changes can create two local dates in one UTC day. Store timezone used at generation.

### WeeklyReport

Purpose: Stores weekly analytics and optional AI summary.

Key fields: user_id, period_start, period_end, timezone, metrics snapshot, AI summary, recommendations, generated_at, delivery status.

Relationships: Belongs to User. Derived from Attempts, ActivityLogs, TopicStats, RevisionSchedules.

Indexes required: user_id plus period_start unique, generated_at, delivery status.

Potential future issues: Reports are snapshots. Later metric formula changes should not silently rewrite historical reports unless explicitly regenerated.

### ActivityLog

Purpose: Event log for streaks, auditing, gamification, and debugging.

Key fields: user_id, event_type, entity_type, entity_id, metadata, occurred_at, source, idempotency_key.

Relationships: Belongs to User and may reference any product entity.

Indexes required: user_id plus occurred_at, event_type plus occurred_at, idempotency_key unique when present.

Potential future issues: Can grow quickly. Need retention policy or cold storage for old low-value events.

### PublicProfileSettings

Purpose: Stores public profile configuration and visibility rules.

Key fields: user_id, username, is_public, visible_stats, hidden_topics, share_badges, allow_indexing, updated_at.

Relationships: One-to-one with User.

Indexes required: unique username, user_id unique, is_public.

Potential future issues: Cached public pages must reflect privacy changes quickly.

### Relationship Summary

One-to-many relationships:

- User to Problem.
- User to Attempt.
- User to RevisionSchedule.
- User to MistakeNote.
- User to TopicStats.
- User to DailyRevisionPlan.
- User to WeeklyReport.
- User to ActivityLog.
- Problem to Attempt.
- Problem to MistakeNote.

Many-to-many relationships:

- Problems to topics. A problem can have many topics, and each topic appears on many problems.
- Users to public platform identities if more platforms are added later.

Data duplication risks:

- TopicStats duplicates aggregate facts from Attempts and RevisionSchedules.
- WeeklyReport duplicates metric snapshots.
- Problem metadata imported from Codeforces can drift from source.
- Public profile projections may duplicate analytics.

Query optimization needs:

- Due revisions must query by user_id and due_at efficiently.
- Dashboard must avoid scanning all attempts on every load.
- Topic analytics should read TopicStats rather than recompute live.
- Sync must deduplicate by platform submission IDs and problem identifiers.

## Section 5 - API Architecture

### API Groups

#### Auth API

Responsibilities: Sign up, login, logout, password reset, session refresh, email verification.

Authentication: Public for sign up/login/reset request. Private for logout/session inspection.

Public vs private: Auth initiation endpoints are public; user session details are private.

#### User API

Responsibilities: Profile, preferences, timezone, reminder settings, linked platform handles.

Authentication: Private.

#### Problem API

Responsibilities: Create, update, archive, search, filter, and inspect tracked problems.

Authentication: Private.

#### Attempt API

Responsibilities: Log attempts, list attempt history, attach notes, record revision outcomes.

Authentication: Private.

#### Revision API

Responsibilities: View today's plan, submit feedback, reschedule, suspend, resume, inspect due queue.

Authentication: Private.

#### Sync API

Responsibilities: Link Codeforces handle, start sync, view sync status, inspect sync errors.

Authentication: Private.

#### Analytics API

Responsibilities: Dashboard metrics, retention, topic mastery, readiness score, streaks.

Authentication: Private, except selected public profile analytics.

#### AI API

Responsibilities: Generate attempt analysis, summarize weekly report, create roadmap suggestions.

Authentication: Private.

#### Public Profile API

Responsibilities: Serve public profile by username and manage public profile settings.

Authentication: Public for viewing enabled profiles. Private for settings.

#### Admin API

Responsibilities: Operational metrics, failed jobs, abuse monitoring, topic normalization.

Authentication: Private admin only.

### Rate Limiting Strategy

Use layered rate limits:

- IP-based limits for unauthenticated auth endpoints.
- User-based limits for private endpoints.
- Strict limits for AI generation because it has external cost and latency.
- Strict limits for Codeforces sync to avoid abuse and external API pressure.
- Separate lower limits for password reset and email-triggering actions.

Reasoning: A single global rate limit is too blunt. Different endpoints have different cost, abuse risk, and user value.

### Validation Strategy

Use request validation at API boundaries:

- Required fields and types.
- Enum values for statuses and feedback states.
- URL validation for problem links.
- Time duration bounds.
- Timezone validation against known IANA zones.
- Topic normalization before persistence.
- Object ownership checks after authentication.

Reasoning: Validation must protect analytics quality. Bad inputs do not only affect one screen; they poison schedules, scores, and reports.

### Error Handling Strategy

Use consistent error categories:

- 400 for invalid input.
- 401 for missing/invalid authentication.
- 403 for authenticated user without permission.
- 404 for missing or inaccessible resources.
- 409 for duplicates or conflicting state.
- 422 for semantically invalid transitions.
- 429 for rate limits.
- 500 for unexpected server failures.
- 503 for external provider failures.

Errors should include a stable code, human-readable message, and optional field-level details. Internal stack traces must not be exposed.

## Section 6 - Revision Engine Design

### Revision States

1. New: Problem has been solved or attempted but has not entered stable revision.
2. Learning: User recently forgot, used editorial, or has low confidence.
3. Reviewing: Problem is in normal spaced repetition.
4. Mature: Problem has repeated successful recalls over longer intervals.
5. Overdue: Due date has passed.
6. Suspended: Excluded from normal plans.
7. Archived: No longer actively tracked.

Reasoning: State helps the product explain what is happening. A single due date is not enough because forgot-heavy problems and mature problems should feel different.

### Priority Score Calculation

Priority should determine ordering when there are more due problems than daily capacity.

Conceptual formula:

Priority = due urgency + retention risk + topic weakness + difficulty weight + lapse penalty - recent overload penalty

Components:

- Due urgency: Increases as a problem becomes overdue.
- Retention risk: Higher when estimated retention is low.
- Topic weakness: Higher when the associated topic mastery is low.
- Difficulty weight: Harder problems get a modest boost because they usually decay faster.
- Lapse penalty: Repeated forgotten outcomes increase priority.
- Recent overload penalty: Prevents the same problem from appearing too often after repeated failures.

Reasoning: Due date alone is insufficient. A hard graph problem in a weak topic that the user forgot twice should outrank an easy array problem due by one day.

Edge cases:

- No topic stats: Use neutral topic weakness.
- Unknown difficulty: Use medium weight.
- Extremely overdue item: Cap urgency so it does not permanently dominate all plans.
- Many weak-topic items: Apply diversity constraints so one topic does not consume the entire day.

### Due Date Generation

Initial due date depends on first solve quality:

- Solved without editorial: short first interval, such as 2 to 3 days.
- Solved with effort or partial help: shorter interval, such as 1 to 2 days.
- Failed or used editorial heavily: next-day review.

Conceptual next interval:

Next interval = previous interval x ease factor x feedback multiplier x confidence adjustment

Reasoning: Intervals should expand after successful recall and contract after failure. The formula must be explainable so users trust the schedule.

### Revision Feedback Handling

#### Remembered Easily

Retention change: Increases significantly.

Interval change: Expands strongly.

Priority change: Decreases because memory appears stable.

Reasoning: Effortless recall indicates the pattern is accessible and can safely wait longer.

Edge cases: If the problem was extremely overdue, reward recall but avoid an excessive jump; long gaps already prove some durability, but one success should not skip too far.

#### Remembered With Effort

Retention change: Increases moderately or remains stable.

Interval change: Expands slightly.

Priority change: Decreases modestly.

Reasoning: The user remembered, but cognitive friction suggests memory is not fully automatic.

Edge cases: If effort repeats many times, keep interval conservative and recommend reviewing the underlying pattern.

#### Forgot

Retention change: Decreases sharply.

Interval change: Resets or contracts to a short interval.

Priority change: Increases.

Reasoning: Forgetting reveals the previous interval was too long or the original understanding was weak.

Edge cases: Repeated forgotten feedback should move the item to Learning and possibly recommend breaking the problem into subpatterns.

#### Used Editorial

Retention change: Decreases, but less ambiguously than Forgot only if the user partially remembered.

Interval change: Shortens substantially.

Priority change: Increases.

Reasoning: Editorial usage means independent recall failed. The system should treat this as a dependency signal.

Edge cases: If user marks editorial after remembering solution but checking proof, allow an optional note to distinguish verification from dependency.

#### Skipped

Retention change: Slight decrease or no direct memory update.

Interval change: Due date remains soon.

Priority change: Increases slowly with repeated skips.

Reasoning: Skipping provides little memory evidence but creates scheduling risk.

Edge cases: One skip should not punish heavily. Repeated skips can indicate anxiety, overload, or irrelevant problem; suggest suspension or rescheduling.

### Adaptive Interval Logic

The engine should maintain:

- Interval days.
- Ease factor.
- Retention estimate.
- Lapse count.
- Last feedback.
- Confidence.

Behavior:

- Successful recall raises ease factor gradually.
- Effortful recall keeps ease factor stable or slightly lower.
- Forgot/editorial lowers ease factor.
- Repeated failures cap interval growth.
- Mature items require several successful recalls across increasing intervals.

Reasoning: Adaptive scheduling avoids rigid fixed intervals and reacts to user-specific memory patterns.

### Suspension Logic

Automatic suspension should be considered when:

- User skips the same problem many times.
- Problem is archived.
- Problem metadata is invalid.
- Problem is far outside current goal.
- User repeatedly fails and marks it as not ready.

Manual suspension should always be available.

Suspended items should retain history and analytics but not appear in normal daily plans.

Edge cases:

- Suspended weak problems can hide weakness. Topic analytics should still include historical failures.
- Resuming after a long time should re-enter Learning, not Mature.
- Suspended due date should not generate reminder emails.

## Section 7 - Retention Engine Design

### What Retention Means

Retention is the estimated probability that a user can independently recall and solve the core idea of a problem or topic at the current time.

It is not the same as solved count. A user may have solved 300 problems and retain very few.

### Problem-Level Retention

Problem retention uses:

- Last feedback.
- Time since last successful recall.
- Interval length.
- Difficulty.
- Lapse count.
- Editorial dependency.

Conceptual formula:

Retention = memory strength adjusted by time decay, difficulty, and recent feedback.

Reasoning: Memory decays over time. Harder problems and editorial-dependent solves should decay faster until proven otherwise.

### Per-Topic Retention

Topic retention is a weighted aggregate of problem-level retention across problems tagged with that topic.

Weights should consider:

- Difficulty.
- Recency.
- Number of revisions.
- Confidence per problem.

Reasoning: A topic with one easy remembered problem should not look stronger than a topic with several medium and hard stable recalls.

### Overall Retention

Overall retention is a weighted average across topic retention scores, adjusted by topic coverage.

Reasoning: Overall retention should represent preparation health, not merely the average of whichever easy topics the user prefers.

### Confidence Scores

Confidence increases with:

- More attempts.
- More revision events.
- More topic diversity.
- Longer successful intervals.
- Recent evidence.

Confidence decreases with:

- Sparse data.
- Old data.
- Mostly imported data without revision feedback.
- Repeated skips.

Reasoning: The product should distinguish "you retain 85%" from "we have too little data, but early signs are positive."

### Low Sample-Size Handling

For small samples:

- Display confidence visibly.
- Use conservative priors.
- Avoid awarding high mastery or readiness too early.
- Prefer language like "early signal" instead of definitive ranking.

### Preventing Distortion

Prevent fake high retention:

- Require independent recall evidence.
- Penalize editorial usage.
- Decay stale solves without revision.

Prevent easy-problem inflation:

- Difficulty weights cap the contribution of easy problems.
- Readiness requires medium and hard coverage.

Prevent small dataset distortion:

- Use confidence gates.
- Apply minimum sample requirements before showing strong claims.

## Section 8 - Topic Mastery Engine

### Mastery Definition

Topic mastery estimates how reliably the user can solve new and previously seen problems in a topic without excessive help.

### Inputs

- Solved count.
- Failed count.
- Difficulty distribution.
- Retention.
- Editorial usage.
- Revision success.
- Recency and consistency.

### Conceptual Weighting System

Mastery = solve quality + retention + difficulty progression + revision reliability + independence - failure pressure

Suggested conceptual weights:

- Retention: high weight because memory is central to the product.
- Revision success: high weight because it proves recall.
- Difficulty distribution: medium-high weight because harder problems show deeper understanding.
- Solved count: medium weight because volume matters but can be gamed.
- Editorial independence: medium weight because help can be part of learning but should not inflate mastery.
- Failed count: negative weight, softened when followed by later success.

Reasoning: Mastery should reward durable, independent problem-solving rather than raw volume.

### Confidence Score System

Confidence is based on:

- Number of problems in the topic.
- Number of revision outcomes.
- Difficulty variety.
- Recency of data.
- Consistency of outcomes.

Low confidence should dampen displayed mastery to avoid false certainty.

### Topic Ranking

Topics should be ranked in multiple ways:

- Strongest topics: high mastery and high confidence.
- Weakest topics: low mastery and adequate confidence.
- Uncertain topics: low data but potentially important.
- High-risk topics: decent mastery but low retention or high editorial usage.

Reasoning: A single sorted list misses the difference between "bad" and "unknown."

## Section 9 - Interview Readiness Engine

### Readiness Definition

Interview readiness estimates how prepared a user is for coding interviews based on durable problem-solving ability across common topics, not merely solved count.

### Inputs And Rationale

Coverage: Measures whether the user has touched enough important topics. Interviews are broad.

Mastery: Measures topic-level strength. Coverage without mastery is shallow.

Retention: Measures whether the user can still recall patterns. Interviews test current ability.

Consistency: Measures practice rhythm. Consistency predicts sustained improvement.

Difficulty mastery: Measures ability on medium and hard problems. Easy-only practice is not enough.

Editorial independence: Measures whether solutions are self-derived. Interviewers expect independent reasoning.

Contest performance: Optional signal for speed and pressure handling.

### Conceptual Weighting

Readiness = coverage + weighted mastery + retention + consistency + difficulty depth + independence + pressure signal

Recommended emphasis:

- Mastery and retention should dominate.
- Coverage should be important but capped.
- Consistency should support the score but not overpower skill.
- Editorial independence should prevent inflated readiness.
- Contest performance should be optional and low-to-medium weight because many interview candidates do not compete.

### Confidence System

Confidence depends on:

- Minimum number of tracked problems.
- Minimum number of revision outcomes.
- Topic diversity.
- Recent activity.
- Presence or absence of contest data.

Low-confidence readiness should be presented as provisional.

### Abuse Prevention

Prevent easy-problem abuse:

- Cap readiness contribution from easy problems.
- Require medium coverage for higher score bands.
- Require hard or advanced-medium evidence for top score bands.

Prevent small sample inflation:

- Apply confidence dampening.
- Avoid displaying high readiness with fewer than a meaningful minimum number of attempts and revisions.

### Presentation

Show:

- Overall readiness score.
- Confidence level.
- Breakdown by factor.
- Top blockers.
- Next three actions.

Reasoning: A single score can motivate, but the explanation is what makes it actionable.

## Section 10 - AI Analysis Engine

### Groq Integration

Groq should be used for structured analysis, not as the source of truth for deterministic metrics.

### Inputs

- User notes.
- Mistake notes.
- Problem title.
- Difficulty.
- Topics.
- Attempt status.
- Time taken.
- Editorial usage.
- Revision feedback.
- Recent topic history.

### Outputs

- Root cause.
- Weak topic.
- Suggested next steps.
- Revision recommendations.
- Confidence or uncertainty explanation.

### Prompt Structure

Prompts should include:

1. System instruction: act as a coding revision coach and return structured output only.
2. User context: goal, topic, difficulty, status, editorial usage, time taken.
3. Attempt notes: sanitized user text.
4. Constraints: do not invent facts, state uncertainty, prefer actionable advice.
5. Output contract: root cause, weak topic, next action, revision recommendation, confidence.

Reasoning: Structured prompts reduce hallucination and make the output usable in analytics and UI.

### Fallback Strategy

If Groq fails:

- Store attempt normally.
- Use deterministic fallback rules.
- Show that AI insight is unavailable.
- Retry only through controlled background retry, not repeated user-blocking calls.

Fallback examples:

- Editorial used plus long time implies likely pattern recognition weakness.
- Forgot plus repeated failures implies high-priority revision.
- Wrong answer on implementation-heavy topic implies implementation review suggestion.

### Failure Handling

Handle:

- Timeout.
- Rate limit.
- Invalid response shape.
- Unsafe content.
- Empty notes.
- Provider outage.

The platform should never block core tracking or revision because AI failed.

## Section 11 - Analytics Dashboard Design

### Today's Revision

Data source: DailyRevisionPlan, RevisionSchedule, Problem.

Calculations: Due count, priority order, overdue count, estimated time.

User value: Gives the user the next concrete action.

### Retention

Data source: RevisionSchedule, Attempt, TopicStats.

Calculations: Overall retention, topic retention, confidence, trend.

User value: Shows whether prior learning is sticking.

### Topic Mastery

Data source: TopicStats, Problem, Attempt.

Calculations: Mastery score, confidence, strongest topics, weakest topics.

User value: Directs future practice.

### Interview Readiness

Data source: TopicStats, retention engine, Attempt, optional contest data.

Calculations: Weighted readiness score and factor breakdown.

User value: Converts progress into preparation confidence.

### Streaks

Data source: ActivityLog, User timezone.

Calculations: Current streak, longest streak, eligible activity days.

User value: Encourages consistency.

### Activity

Data source: ActivityLog and Attempt.

Calculations: Daily activity counts, solves, revisions, notes, AI analyses.

User value: Makes effort visible.

### Weekly Improvement

Data source: WeeklyReport, TopicStats snapshots, Attempts.

Calculations: Retention delta, mastery delta, solved count, revision success delta.

User value: Shows progress beyond daily noise.

## Section 12 - Gamification System

### XP

XP should reward learning-quality actions:

- Solving a new problem.
- Revising a due problem.
- Recording a meaningful mistake note.
- Completing a daily revision plan.
- Improving a weak topic.

Reasoning: XP should reinforce behaviors that improve retention, not empty clicks.

Anti-farming:

- No XP for repeatedly editing the same note.
- Reduced XP for skipped revisions.
- Daily caps for low-effort actions.
- Imported history gives limited or delayed XP.

### Streaks

A streak day should require a meaningful action:

- Complete at least one due revision.
- Log a real attempt with sufficient metadata.
- Complete a daily plan.

Reasoning: A streak should represent learning continuity.

Anti-abuse:

- Do not count login-only activity.
- Use user timezone consistently.
- Store local date at event time.

### Badges

Badge categories:

- Revision consistency.
- Topic mastery.
- Editorial independence.
- First successful week.
- Weak topic comeback.
- Medium/hard progression.

Anti-abuse:

- Require confidence thresholds.
- Limit badges from imports.
- Use source events with idempotency.

## Section 13 - Public Profile System

### Public Stats

Optional visible stats:

- Display name and username.
- Total tracked problems.
- Revision streak.
- Topic strengths.
- Badges.
- Interview readiness range.
- Recent activity summary.

Raw notes, private mistakes, email, reminder settings, and exact weak-topic details should be private by default.

### Privacy Controls

Controls:

- Enable or disable public profile.
- Choose visible stats.
- Hide specific topics.
- Hide readiness score.
- Hide streak.
- Disable search indexing.

### Shareable Profile

Profile URL should use a unique public username.

Reasoning: Public sharing can motivate users and serve as a portfolio signal, but privacy must be explicit.

### Security Risks

- Private mistake notes leaking.
- Email exposure.
- Profile remaining cached after disabling.
- Inference attacks from weak topic visibility.
- Username impersonation.
- Public endpoint enumeration.

### Privacy Edge Cases

- User disables profile after sharing link.
- User changes username.
- Deleted user profile still indexed externally.
- Hidden topics still affecting visible aggregate scores.

Mitigation:

- Serve public data through a strict projection layer.
- Revalidate cache on privacy changes.
- Never expose raw private collections directly.

## Section 14 - Scheduling System

### Daily Revision Generation

Daily job:

1. Determine each user's local date.
2. Check whether a DailyRevisionPlan already exists for that local date.
3. Query due and high-priority RevisionSchedules.
4. Apply daily capacity and diversity rules.
5. Store the plan with idempotency.

Reasoning: Storing generated plans prevents moving targets during the day.

### Weekly Reports

Weekly job:

1. Determine local week boundary.
2. Check whether report exists for the period.
3. Compute deterministic metrics.
4. Generate optional AI summary.
5. Store report snapshot.
6. Send email if enabled.

### Email Reminders

Reminder job:

1. Identify users whose local reminder time is due.
2. Check reminder preferences and due count.
3. Prevent duplicate send using user, local date, and notification type.
4. Send via Nodemailer.
5. Record delivery status.

### Timezone Handling

Use IANA timezone identifiers. Store UTC timestamps plus local date snapshots for streaks, plans, and reports.

Reasoning: UTC alone is insufficient for user-facing daily behavior.

### Duplicate Prevention

Use idempotency keys:

- daily-plan:user_id:local_date
- weekly-report:user_id:period_start
- reminder:user_id:local_date:type

### Failure Recovery

- Failed jobs should be retryable.
- Partial failures should record status.
- Email failure should not delete reports.
- AI failure should not block report creation.
- Cron jobs should be safe to rerun.

## Section 15 - Frontend Information Architecture

### Pages

#### Auth Pages

- Sign up.
- Login.
- Forgot password.
- Reset password.

States: Loading, validation errors, expired reset token, already authenticated.

#### Onboarding

- Goal selection.
- Platform selection.
- Timezone and reminder setup.
- First problem or sync choice.

States: Empty, skipped, partially complete, sync failure.

#### Dashboard

Primary layout:

- Today's Revision at top.
- Retention and readiness summary.
- Topic mastery snapshot.
- Streak and activity.
- Weekly improvement.

Reasoning: The dashboard should answer "What should I do today?" before showing broad analytics.

#### Problems

- Search and filters.
- Problem table/list.
- Add/edit problem.
- Problem detail page.
- Attempt history.
- Mistake notes.

States: Empty problem library, no filter results, duplicate warning, save error.

#### Revision

- Today's plan.
- Revision item detail.
- Feedback controls.
- Overdue list.
- Suspended list.

States: No due revisions, all completed, overdue overflow, skipped items.

#### Analytics

- Retention.
- Topic mastery.
- Interview readiness.
- Activity calendar.
- Weekly reports.

States: Not enough data, low confidence, loading charts, calculation error.

#### AI Insights

- Attempt insights.
- Weak-topic recommendations.
- Roadmap suggestions.

States: No notes, AI unavailable, generating, dismissed insight.

#### Public Profile Settings

- Username.
- Visibility toggles.
- Preview.
- Disable profile.

States: Username taken, profile disabled, preview loading.

#### Public Profile

- Public-safe stats.
- Badges.
- Selected topic strengths.
- Activity summary.

States: Profile not found, disabled, private stats hidden.

#### Admin

- Sync failures.
- AI failures.
- Email delivery issues.
- Abuse signals.
- Topic normalization tools.

### Major Components

- App shell.
- Sidebar navigation.
- Mobile bottom navigation.
- Dashboard metric cards.
- Revision queue.
- Feedback selector.
- Problem form.
- Problem filters.
- Attempt timeline.
- Mistake note editor.
- Retention chart.
- Topic mastery chart.
- Readiness breakdown.
- Activity calendar.
- Weekly report viewer.
- Public profile preview.

### Navigation Structure

Desktop:

- Dashboard.
- Problems.
- Revision.
- Analytics.
- AI Insights.
- Profile.
- Settings.

Mobile:

- Dashboard.
- Revision.
- Problems.
- Analytics.
- More.

### Theme Application

Use:

- Primary background: #222831.
- Secondary surface: #393E46.
- Accent: #00ADB5.
- Text: #EEEEEE.

Reasoning: This palette supports a focused, technical feel. Contrast must be tested because dark UIs can easily become low-legibility if secondary text is too muted.

## Section 16 - Edge Case Audit

### Authentication

- Duplicate email.
- Password reset token expired.
- Password reset token reused.
- User deleted while session active.
- Timezone missing.
- Email delivery failure.
- Brute-force login attempts.

### Sync

- Invalid Codeforces handle.
- Codeforces API outage.
- Rate-limited external API.
- Duplicate submissions.
- Problem tags change.
- Submission lacks rating.
- User disconnects handle.
- Imported history conflicts with manual problem.

### Analytics

- No data.
- Sparse data.
- Topic aliases.
- Aggregates out of sync.
- Old imported data without revision evidence.
- Easy-only solved set.
- All problems in one topic.

### Retention

- User skips repeatedly.
- User revises late.
- User marks wrong feedback accidentally.
- Long inactivity gap.
- Mature problem forgotten.
- Unknown difficulty.
- Deleted problem with schedule.

### Revision

- Too many due items.
- No due items.
- Due item archived.
- Problem suspended.
- Feedback submitted twice.
- User changes timezone midday.
- Plan generated before new attempt.

### AI

- Empty notes.
- Prompt injection in notes.
- Groq timeout.
- Rate limit.
- Invalid response format.
- Hallucinated topic.
- Unsafe or discouraging output.

### Scheduling

- Cron runs twice.
- Server downtime during reminder window.
- Daylight saving change.
- Timezone change.
- Duplicate emails.
- Report generated without AI summary.

### Profiles

- Disabled profile still cached.
- Username squatting.
- Private stats accidentally visible.
- Deleted user public page.
- Hidden weak topics still inferable.

### Network Failures

- Client submits same attempt twice after retry.
- Offline revision feedback.
- API timeout after successful write.
- Partial sync completion.

### Missing Data

- Problem without difficulty.
- Problem without topics.
- Attempt without notes.
- User without timezone.
- Weekly report with no activity.

### Corrupt Data

- Negative time taken.
- Invalid due date.
- Attempt references missing problem.
- TopicStats drift from Attempts.
- Public settings reference invalid username.

### Timezone Changes

- Streak boundaries shift.
- Daily plan duplicated.
- Reminder sent at wrong local time.
- Weekly report period changes.
- Revision due dates remain UTC but local display changes.

## Section 17 - Phased Development Plan

### Phase 1 - Product Skeleton And Auth

Goal: Establish account foundation and navigable product shell.

Deliverables:

- Auth flows.
- User preferences.
- App navigation.
- Theme setup.
- Basic dashboard empty state.

Dependencies: User collection planning, auth middleware, validation strategy.

Risks: Overbuilding UI before core data exists.

Definition of Done:

- User can sign up, log in, log out, and update timezone/preferences.
- Empty states clearly guide first action.

### Phase 2 - Manual Problem And Attempt Tracking

Goal: Let users record the core learning data manually.

Deliverables:

- Problem creation and editing.
- Attempt logging.
- Mistake notes.
- Problem search and filters.

Dependencies: Problem, Attempt, MistakeNote collections.

Risks: Poor validation can poison later analytics.

Definition of Done:

- User can track problems and attempts with duplicate protection.
- Attempt history is visible per problem.

### Phase 3 - Basic Revision Engine

Goal: Generate due dates and capture revision feedback.

Deliverables:

- RevisionSchedule records.
- Today's Revision view.
- Feedback states.
- Basic interval updates.

Dependencies: Problem and Attempt tracking.

Risks: Scheduling logic becomes hard to explain.

Definition of Done:

- Solved problems enter revision.
- Feedback updates next due date.
- Daily due list works.

### Phase 4 - Topic Stats And Retention

Goal: Turn revision history into meaningful analytics.

Deliverables:

- TopicStats aggregation.
- Retention estimates.
- Dashboard retention widgets.
- Confidence handling.

Dependencies: Revision feedback history.

Risks: Small datasets misleading users.

Definition of Done:

- Dashboard shows retention with confidence.
- Topic retention handles low sample sizes conservatively.

### Phase 5 - Topic Mastery And Readiness

Goal: Provide higher-level progress interpretation.

Deliverables:

- Mastery score.
- Interview readiness score.
- Factor breakdown.
- Recommendations.

Dependencies: TopicStats and retention.

Risks: Users may over-trust a score if confidence is hidden.

Definition of Done:

- Scores are explainable.
- Low-confidence states are visibly dampened.

### Phase 6 - Codeforces Sync

Goal: Import real competitive programming history.

Deliverables:

- Handle linking.
- Submission import.
- Deduplication.
- Sync summary and error handling.

Dependencies: Problem and Attempt infrastructure.

Risks: External API instability and duplicate data.

Definition of Done:

- Repeated syncs are idempotent.
- Imported attempts update analytics without duplication.

### Phase 7 - Scheduling Jobs And Email

Goal: Automate daily plans, reminders, and weekly reports.

Deliverables:

- node-cron jobs.
- Daily plan generation.
- Weekly report generation.
- Nodemailer reminders.
- Idempotency keys.

Dependencies: Revision and analytics engines.

Risks: Duplicate jobs and timezone mistakes.

Definition of Done:

- Plans and reports generate once per local period.
- Emails do not duplicate.

### Phase 8 - AI Analysis With Groq

Goal: Add structured coaching insights.

Deliverables:

- Attempt analysis.
- Weak topic suggestions.
- Weekly AI summaries.
- Fallback handling.

Dependencies: Attempt notes, analytics, Groq configuration.

Risks: Hallucination, cost, latency, user trust.

Definition of Done:

- AI failure never blocks core flows.
- AI output is structured and reviewable.

### Phase 9 - Gamification

Goal: Encourage consistent high-quality learning.

Deliverables:

- XP.
- Streaks.
- Badges.
- Anti-farming controls.

Dependencies: ActivityLog and core learning events.

Risks: Users optimize for XP instead of learning.

Definition of Done:

- XP rewards meaningful actions.
- Streaks use local dates correctly.

### Phase 10 - Public Profiles

Goal: Let users share selected progress safely.

Deliverables:

- Public username.
- Visibility settings.
- Shareable profile.
- Public-safe projection layer.

Dependencies: Analytics and privacy settings.

Risks: Private data leakage.

Definition of Done:

- Disabled profiles reveal nothing.
- Raw notes and private fields are never public.

### Phase 11 - Administration And Reliability

Goal: Prepare the product for real users and operational issues.

Deliverables:

- Admin monitoring.
- Failed job inspection.
- Sync failure tracking.
- AI and email failure metrics.
- Aggregate rebuild tools.

Dependencies: ActivityLog and background jobs.

Risks: Silent data drift and undetected failures.

Definition of Done:

- Operators can detect failed syncs, failed emails, AI failures, and aggregate drift.

### Phase 12 - Hardening And Launch Readiness

Goal: Stabilize the platform for beta users.

Deliverables:

- Security review.
- Rate limit tuning.
- Load testing for dashboard queries.
- Data consistency checks.
- Backup and recovery plan.
- Privacy review.

Dependencies: All core features.

Risks: Real user behavior exposes edge cases not covered in happy-path testing.

Definition of Done:

- Core flows work under realistic usage.
- Sensitive data is protected.
- Background jobs are idempotent.
- Metrics are explainable and resilient to low data.

