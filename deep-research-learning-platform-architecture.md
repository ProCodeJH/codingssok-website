# Deep Research: World-Class Learning Platform Architecture for CodingSSOK (코딩쏙)

## Internal Engineering Document - Exhaustive Technical Analysis

---

# 1. ADAPTIVE LEARNING ENGINE ARCHITECTURE

## 1.1 Khan Academy: Mastery-Based Learning Engine

### Architecture
Khan Academy's personalization engine is driven by a **Knowledge Graph** representing relationships between concepts and skills. The backend uses Python/Django, deployed on cloud infrastructure.

### Mastery Level State Machine
```
[Not Started] -> [Attempted] -> [Familiar] -> [Proficient] -> [Mastered]

Transitions:
- Not Started -> Attempted: First interaction
- Attempted -> Familiar: 70%+ correct on skill exercises
- Familiar -> Proficient: 100% correct on skill quiz
- Proficient -> Mastered: Maintained over time + passed course challenge
- Any -> Attempted: Skill decays if not practiced (time-based regression)
```

### Mastery Scoring Algorithm
```
mastery_score = weighted_sum(
    recent_accuracy * 0.4,
    streak_correct * 0.2,
    time_since_last_practice * -0.15,
    prerequisite_mastery * 0.15,
    challenge_performance * 0.1
)

Levels:
- mastery_score < 0.2  -> "Not Started"
- mastery_score < 0.5  -> "Attempted"
- mastery_score < 0.7  -> "Familiar"
- mastery_score < 0.9  -> "Proficient"
- mastery_score >= 0.9 -> "Mastered"
```

### Data Signals Tracked
- Correctness per skill per attempt
- Time-to-answer (speed of response)
- Hint usage count
- Video watch completion rates
- Number of attempts before correct answer
- Time since last practice of each skill
- Prerequisite skill mastery levels

### Khanmigo (AI Tutor Layer)
- Built on GPT-4 with access to Khan Academy's content graph
- Combines chat-based tutoring with knowledge state awareness
- Uses Socratic questioning (never gives answers directly)
- Accesses student's mastery data to personalize interventions

---

## 1.2 Duolingo: Half-Life Regression (HLR) Algorithm

### Core Mathematical Model

The probability that a learner recalls an item is modeled as an exponential decay:

```
p_recall = 2^(-delta / h)

Where:
  p_recall = probability of correct recall (0 to 1)
  delta    = time elapsed since last review (in seconds)
  h        = "half-life" of the memory (in seconds)
```

When delta = h, p_recall = 0.5 (50% chance of recall -- the "half-life" of memory).

### Half-Life Estimation

The half-life h is estimated via regression:

```
h_theta = 2^(theta . x)

Where:
  theta = model weight vector (learned from data)
  x     = feature vector for a learner-item pair
```

### Feature Vector (x) - What Signals Are Tracked
Each learner-word pair tracks:
| Feature | Description |
|---------|-------------|
| `p_recall` | Proportion correct in current lesson |
| `delta` | Seconds since last encounter |
| `history_seen` | Total prior encounters with this item |
| `history_correct` | Total prior correct recalls |
| `session_seen` | Encounters within current session |
| `session_correct` | Correct recalls within current session |
| `lexeme_id` | Unique morphological identifier |

### Training Objective
The model minimizes a combined loss:

```
L(theta) = sum_i [ (p_i - p_hat_i)^2 + alpha * (h_i - h_hat_i)^2 + lambda * ||theta||^2 ]

Where:
  p_i     = observed recall rate
  p_hat_i = predicted recall rate
  h_i     = observed half-life (estimated from data)
  h_hat_i = predicted half-life
  alpha   = half-life loss weight
  lambda  = L2 regularization coefficient
```

### Scheduling Algorithm
```python
def schedule_next_review(learner_item):
    h = estimate_half_life(learner_item)
    # Schedule review when p_recall drops to target threshold
    target_p = 0.5  # or configurable per difficulty
    # Solve: target_p = 2^(-delta/h) for delta
    optimal_delta = -h * log2(target_p)  # = h when target_p = 0.5
    next_review_time = now() + optimal_delta
    return next_review_time
```

### Performance
- HLR error rate is nearly **half** that of the Leitner system
- Outperforms SM-2, Leitner, and simple exponential models
- Trained on 13 million Duolingo learning traces
- Published: Settles & Meeder, ACL 2016

### Application to Coding Education (코딩쏙)
```
Feature vector for code concepts:
- concept_id (e.g., "for_loop", "if_else", "function_definition")
- times_used_in_exercises
- times_correct_first_attempt
- seconds_since_last_exercise_with_concept
- related_concepts_mastered_count
- complexity_level (1-5)
- error_type_history (syntax, logic, runtime)
```

---

## 1.3 Knowledge Space Theory (Doignon & Falmagne) / ALEKS

### Formal Mathematical Framework

**Definition: Knowledge State**
A *knowledge state* K is a subset of a domain Q of problems that a learner can solve.

```
Q = {q1, q2, q3, ..., qn}  (all problems in a domain)
K ⊆ Q                       (a student's knowledge state)
```

**Definition: Knowledge Space**
A *knowledge space* is a collection K of knowledge states that:
1. Contains the empty set ∅ (knows nothing)
2. Contains Q (knows everything)
3. Is closed under union: if K1, K2 ∈ K, then K1 ∪ K2 ∈ K

**Definition: Surmise Relation**
A prerequisite ordering: if solving problem q requires first solving problem p, then p ≺ q (surmise relation).

```
Example for coding:
  "variables" ≺ "if_else" ≺ "loops" ≺ "nested_loops" ≺ "functions"
  "variables" ≺ "arithmetic" ≺ "loops"
```

### ALEKS Adaptive Assessment Algorithm

```
Algorithm: Knowledge State Identification

Input: Knowledge space K with states {K1, K2, ..., Km}
Output: Student's most likely knowledge state K*

1. Initialize probability distribution P(Ki) = 1/m for all states
2. Repeat for ~25-30 questions:
   a. Select question q that maximally discriminates between
      remaining candidate states (information gain)
   b. Present question q to student
   c. Observe response r (correct/incorrect)
   d. Update P(Ki) using Bayes' rule:
      - If correct: P(Ki|correct) ∝ P(correct|Ki) * P(Ki)
        where P(correct|Ki) = 1-slip if q ∈ Ki, else guess
      - If incorrect: P(Ki|incorrect) ∝ P(incorrect|Ki) * P(Ki)
   e. Prune states with P(Ki) < threshold
3. Return K* = argmax P(Ki)
```

### "Ready to Learn" (Outer Fringe)
```
Given student's state K:
  Ready_to_learn = {q ∈ Q\K : K ∪ {q} ∈ K}

Translation: Items NOT in the student's state, but where adding
them would still form a valid knowledge state (all prerequisites met).
```

### Application to Coding (코딩쏙)
```
Domain Q for children's Python:
  q1: print()
  q2: variables
  q3: input()
  q4: if/else
  q5: comparison operators
  q6: while loops
  q7: for loops
  q8: lists
  q9: functions
  q10: function parameters

Prerequisite graph:
  q1 -> q2 -> q3
  q2 -> q4
  q2 -> q5 -> q4
  q4 -> q6
  q4 -> q7
  q2 -> q8 -> q7
  q2 -> q9 -> q10

If student state K = {q1, q2, q3, q5}:
  Ready to learn = {q4, q8} (prerequisites met)
  NOT ready = {q6, q7, q9, q10} (prerequisites missing)
```

---

## 1.4 Bayesian Knowledge Tracing (BKT)

### Core Parameters (Per Skill)
```
P(L0) = Prior probability student already knows the skill (before any observations)
P(T)  = Probability of learning/transitioning from unknown to known on each opportunity
P(G)  = Probability of guessing correctly despite not knowing (guess rate)
P(S)  = Probability of making a mistake despite knowing (slip rate)
```

### Typical Parameter Values
```
P(L0) = 0.1  to 0.3   (most students start not knowing)
P(T)  = 0.05 to 0.2   (learning happens gradually)
P(G)  = 0.1  to 0.3   (some guessing possible)
P(S)  = 0.05 to 0.15  (occasional careless errors)
```

### Update Equations

**After observing a CORRECT answer at step n:**
```
P(Ln | correct) = P(Ln) * (1 - P(S)) / P(correct)

Where:
P(correct) = P(Ln) * (1 - P(S)) + (1 - P(Ln)) * P(G)
```

**After observing an INCORRECT answer at step n:**
```
P(Ln | incorrect) = P(Ln) * P(S) / P(incorrect)

Where:
P(incorrect) = P(Ln) * P(S) + (1 - P(Ln)) * (1 - P(G))
```

**Learning transition (for next step):**
```
P(Ln+1) = P(Ln | observation) + (1 - P(Ln | observation)) * P(T)
```

### Mastery Decision
```
if P(Ln) >= 0.95:  # mastery threshold
    student has mastered this skill
    move to next skill in prerequisite graph
```

### Complete BKT Algorithm for 코딩쏙
```python
class BKTSkill:
    def __init__(self, p_l0=0.1, p_t=0.1, p_g=0.2, p_s=0.1):
        self.p_know = p_l0      # Current P(L)
        self.p_transit = p_t     # P(T) - learning rate
        self.p_guess = p_g       # P(G) - guess rate
        self.p_slip = p_s        # P(S) - slip rate
        self.mastery_threshold = 0.95

    def update(self, is_correct: bool) -> float:
        """Update knowledge estimate after an observation."""
        if is_correct:
            p_obs = self.p_know * (1 - self.p_slip) + \
                    (1 - self.p_know) * self.p_guess
            self.p_know = (self.p_know * (1 - self.p_slip)) / p_obs
        else:
            p_obs = self.p_know * self.p_slip + \
                    (1 - self.p_know) * (1 - self.p_guess)
            self.p_know = (self.p_know * self.p_slip) / p_obs

        # Learning transition
        self.p_know = self.p_know + (1 - self.p_know) * self.p_transit
        return self.p_know

    def is_mastered(self) -> bool:
        return self.p_know >= self.mastery_threshold

    def predict_correct(self) -> float:
        """Predict probability of next answer being correct."""
        return self.p_know * (1 - self.p_slip) + \
               (1 - self.p_know) * self.p_guess
```

---

## 1.5 Knewton Adaptive Learning Platform Architecture

### System Architecture
```
[Partner App] <-> [API Layer] <-> [Core Services]
                                     |
                     +---------------+---------------+
                     |               |               |
              [Knowledge Graph] [Inference Engine] [Analytics]
                     |               |               |
              [Content Graph]  [Student Models]  [Dashboards]
```

### Knowledge Graph Structure
```
Nodes:
  - Content Items (questions, videos, exercises)
  - Concepts (abstract learning objectives)
  - Modules (groups of concepts)

Edges:
  - "assesses" (content item -> concept)
  - "instructs" (content item -> concept)
  - "prerequisite" (concept -> concept)
  - "related" (concept <-> concept)
```

### Inference Engine
- Uses Item Response Theory (IRT) with time-indexed random variables
- Models student proficiency as a continuous latent variable that changes over time
- Employs probabilistic graphical models for cross-concept inference
- Hierarchical agglomerative clustering for grouping similar learners

### Three Core Services
1. **Personalized Recommendations**: What to study next
2. **Analytics**: Proficiency estimates for teachers/students
3. **Content Insights**: Which content is effective at teaching which concepts

---

# 2. GAMIFICATION SYSTEMS THAT ACTUALLY WORK

## 2.1 Psychological Mechanisms (Duolingo Deep Dive)

### Streak System - Loss Aversion Engine
```
Psychological Principle: Kahneman & Tversky Prospect Theory
  - Losing something feels 2x more painful than gaining equivalent value
  - A 30-day streak "costs" more psychologically than 30 days of XP

Implementation:
  streak_value = days_consecutive * multiplier
  perceived_loss = streak_value * 2.0  // loss aversion coefficient

  // Streak freezes create monetization + reduce churn
  streak_freeze_cost = f(streak_length)  // costs more for longer streaks
```

### Hearts System - Scarcity + Careful Engagement
```
hearts_max = 5
hearts_regen_rate = 1 per 5 hours (or via practice)

Psychological effect:
  - Finite resources -> more careful consideration per answer
  - "Stakes" transform passive clicking into active engagement
  - Heart loss = micro-frustration -> relief on lesson completion (dopamine)
  - Purchase option = monetization pressure point
```

### League System - Social Comparison + Variable Reinforcement
```
League Structure:
  Bronze -> Silver -> Gold -> Sapphire -> Ruby ->
  Emerald -> Amethyst -> Pearl -> Obsidian -> Diamond

Mechanics:
  - 30 users per league cohort (weekly reset)
  - Top ~10 promote, bottom ~5 demote
  - XP earned across ALL activities counts

Result: 25% increase in lesson completion after introduction

Variable Ratio Schedule:
  - You never know exactly how much XP competitors will earn
  - Checking leaderboard position = "slot machine pull"
  - Promotion/demotion uncertainty drives repeated engagement
```

### XP System Design
```
XP Sources:
  lesson_completion = 10-15 XP base
  perfect_lesson    = +5 XP bonus
  streak_bonus      = +2 XP per day of streak (capped)
  timed_challenge   = variable (speed-based)
  friend_quest      = collaborative bonus XP

Daily Goal Tiers:
  Casual:  10 XP/day
  Regular: 20 XP/day
  Serious: 30 XP/day
  Intense: 50 XP/day
```

### Push Notification System (Bandit Algorithm)
```
Algorithm: Sleeping Recovering Bandit

Context: Choosing which notification template to send to each user

Arms (notification types):
  - Streak reminder ("Don't lose your X-day streak!")
  - Guilt trip ("These reminders don't seem to be working...")
  - Social ("Your friend just passed you!")
  - Encouraging ("You're almost at your daily goal!")
  - Leaderboard ("You've dropped to 15th place!")

Selection:
  1. Filter eligible templates (user context)
  2. Apply frequency penalty (don't repeat same type)
  3. Score each arm using historical open rates (exploitation)
  4. Add exploration bonus for under-tested templates
  5. Select highest scoring template
  6. Track open/engagement for future training

Results:
  - +0.5% DAU increase
  - +2%+ new user retention
  - Uses AWS Kinesis + Spark + Elasticbeanstalk

Critical Rule: PROTECT THE CHANNEL
  - If user stops engaging with notifications -> reduce frequency
  - Never optimize short-term by burning out the notification channel
  - This constraint separates Duolingo from spammy apps
```

---

## 2.2 Variable Ratio Reinforcement Schedule (Applied)

### Theory (B.F. Skinner)
```
Fixed Ratio:    Reward every N actions (predictable -> boredom)
Variable Ratio: Reward after ~N actions on average (unpredictable -> addiction)
Fixed Interval:   Reward every T time (predictable -> clock-watching)
Variable Interval: Reward after ~T time on average (moderate engagement)

Most engaging: Variable Ratio (slot machines, social media, loot boxes)
```

### Application to Coding Education
```python
class RewardScheduler:
    """Variable ratio reinforcement for coding exercises."""

    def __init__(self):
        self.base_ratio = 3  # average exercises between bonus rewards
        self.variance = 2     # +/- range
        self.next_reward_at = self._calculate_next()
        self.exercise_count = 0

    def _calculate_next(self):
        return self.exercise_count + random.randint(
            max(1, self.base_ratio - self.variance),
            self.base_ratio + self.variance
        )

    def on_exercise_complete(self, was_correct):
        self.exercise_count += 1
        rewards = {"xp": 10}  # base reward (fixed)

        if self.exercise_count >= self.next_reward_at:
            # VARIABLE REWARD - surprise bonus!
            bonus_type = random.choice([
                {"type": "bonus_xp", "amount": random.randint(5, 25)},
                {"type": "badge_progress", "amount": 1},
                {"type": "special_item", "item": random.choice(COSMETICS)},
                {"type": "streak_shield", "duration": "1_day"},
            ])
            rewards["bonus"] = bonus_type
            self.next_reward_at = self._calculate_next()

        return rewards
```

---

## 2.3 CodeCombat/CodinGame Game-Based Learning Structure

### CodeCombat Level Progression
```
Structure: RPG-style dungeon crawler where code = actions

Level Design Pattern:
  1. Introduction: NPC explains new concept (30 seconds max)
  2. Guided Practice: Pre-filled code with 1-2 blanks to fill
  3. Independent Practice: Write full solution for simple scenario
  4. Challenge: Apply concept in harder scenario with multiple solutions
  5. Boss Level: Combine multiple concepts under time/resource pressure

Curriculum Map:
  Unit 1 (CS1): Sequences, syntax, strings         - 35 levels
  Unit 2 (CS2): Loops, variables                     - 42 levels
  Unit 3 (CS3): Conditionals, boolean logic          - 38 levels
  Unit 4 (CS4): Nested conditionals, functions       - 40 levels
  Unit 5 (Game Dev 1): Events, UI                    - 28 levels
  Unit 6 (Game Dev 2): Physics, collisions           - 30 levels
```

### Game Engagement Loop for Coding
```
[Write Code] -> [Execute] -> [See Character Act] -> [Succeed/Fail]
     ^                                                    |
     |              [Adjust Code]  <----  [Observe Result]
     |                    |
     +----[New Concept]---+

Key insight: The feedback loop must be < 5 seconds for children.
Write -> See Result must feel immediate.
```

---

## 2.4 XP Curve Formulas for 코딩쏙

### Recommended: Quadratic Progression (Best for Children)
```
XP_required(level) = base * level^exponent

Recommended parameters for children's coding:
  base = 50
  exponent = 1.5  (gentler than exponential, steeper than linear)

Level |  XP to Next  | Cumulative | ~Exercises (at 10 XP each)
  1   |      50      |      50    |    5
  2   |     141      |     191    |   14
  3   |     260      |     451    |   26
  4   |     400      |     851    |   40
  5   |     559      |    1410    |   56
 10   |    1581      |    8660    |  158
 15   |    2905      |   23,236   |  290
 20   |    4472      |   46,742   |  447

Alternative: Fibonacci-style (Golden Ratio)
  XP(n) = XP(n-1) + XP(n-2)
  50, 50, 100, 150, 250, 400, 650, 1050, 1700, 2750...
  Ratio approaches phi (1.618) -- feels "natural" to humans
```

### Tier/Rank System
```
Tier System (코딩쏙 Recommended):
  Level  1-5:   씨앗 (Seed)        - Green badge
  Level  6-10:  새싹 (Sprout)      - Light green badge
  Level 11-15:  나무 (Tree)        - Brown badge
  Level 16-20:  꽃 (Flower)        - Pink badge
  Level 21-30:  열매 (Fruit)       - Orange badge
  Level 31-40:  별 (Star)          - Gold badge
  Level 41-50:  우주 (Universe)    - Purple badge

Each tier unlocks:
  - New avatar customization options
  - Access to harder challenge modes
  - Ability to "mentor" lower-tier students
  - Special project templates
```

---

## 2.5 Why Gamification Fails vs. Succeeds (Research-Based)

### Meta-Analysis Findings (2023-2025)

**SUCCEEDS when:**
- Gamification elements support **autonomy** (choice in what to learn next)
- **Intrinsic motivation** is the primary target, not extrinsic rewards
- Points/badges are **feedback mechanisms**, not goals themselves
- Social elements create **relatedness** (community, not just competition)
- Primary school students show **larger effect sizes** than older students
- Effect size for learning outcomes: g = 0.822 (large) across meta-analyses

**FAILS when:**
- Shallow implementation: slapping badges on boring content
- **Overjustification effect**: excessive extrinsic rewards destroy intrinsic motivation
- Students feel **no perceived competence** (tasks too hard or feedback unclear)
- Students feel **no autonomy** (forced linear paths, no choice)
- **Novelty wears off**: initial engagement spike followed by decline
- Leaderboards **demotivate bottom-half students** without proper design
- Long exposure without novelty injection leads to habituation

### Critical Design Principles
```
1. AUTONOMY: Let children choose their next challenge from 2-3 options
2. COMPETENCE: Ensure 70-80% success rate (Vygotsky's ZPD)
3. RELATEDNESS: Social features that create connection, not just competition
4. MEANINGFUL REWARDS: Unlock capabilities, not just cosmetics
5. VARIABLE REINFORCEMENT: Unpredictable bonus rewards
6. PROGRESS VISIBILITY: Always show how far they've come AND how far to go
7. NARRATIVE: Embed learning in a story (characters, quests, world-building)
```

---

# 3. REAL-TIME CODE ASSESSMENT & FEEDBACK

## 3.1 Online Judge Architecture (LeetCode/HackerRank Pattern)

### System Architecture
```
                    +------------------+
                    |   Web Frontend   |
                    | (Code Editor UI) |
                    +--------+---------+
                             |
                    +--------v---------+
                    |    API Gateway    |
                    |  (Rate Limiting)  |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
    +---------v----------+       +----------v---------+
    |  Problem Service   |       | Submission Service  |
    | (CRUD, Test Cases) |       | (Queue + Evaluate)  |
    +--------------------+       +----------+----------+
                                            |
                                  +---------v----------+
                                  |   Message Queue    |
                                  |  (Redis/RabbitMQ)  |
                                  +---------+----------+
                                            |
                              +-------------+-------------+
                              |             |             |
                        +-----v----+  +-----v----+  +-----v----+
                        | Worker 1 |  | Worker 2 |  | Worker N |
                        | (Docker) |  | (Docker) |  | (Docker) |
                        +----------+  +----------+  +----------+
```

### Code Execution Pipeline
```
1. User submits code via POST /submissions
2. API validates request, stores in DB, publishes to queue
3. Returns submission_id immediately (async)
4. Worker picks up job from queue:
   a. Spin up fresh Docker container with language runtime
   b. Inject user code + test case input
   c. Set resource limits:
      - CPU: 0.5 cores (--cpus="0.5")
      - Memory: 512MB (--memory="512M")
      - Time: 3-second watchdog timer
      - Network: none (--network="none")
      - Filesystem: read-only (--read-only)
   d. Compile (if needed) and execute
   e. Capture stdout, stderr, exit code, timing
   f. Compare output with expected output (byte-by-byte)
   g. Kill container, report results
5. Client polls GET /submissions/{id}/status every 1-2 seconds
```

### Safety: Resource Limiting with Linux cgroups
```
Container limits enforced by kernel:
  - Memory: Hard cap at 512MB, SIGKILL on exceed
  - CPU: Limited to 1 core
  - PID: Max 64 processes (prevents fork bombs)
  - Time: Watchdog sends SIGKILL after time limit
  - Disk: Read-only filesystem
  - Network: Completely isolated
  - Capabilities: ALL dropped (--cap-drop="ALL")
```

### Judge0: Open Source Solution for 코딩쏙
```
Judge0 features:
  - 60+ language support (Python, JavaScript, Scratch->Python, etc.)
  - REST API: POST /submissions with {source_code, language_id, stdin}
  - Self-hostable on Docker
  - Built-in sandboxing
  - Configurable time/memory limits
  - Perfect for educational use

API example:
POST /submissions
{
  "source_code": "print('Hello')",
  "language_id": 71,  // Python 3
  "stdin": "",
  "expected_output": "Hello\n",
  "cpu_time_limit": 2,
  "memory_limit": 128000
}
```

### Leaderboard with Redis Sorted Sets
```
Composite score encoding:
  score = (points * 1_000_000_000) + (1_000_000_000 - time_seconds)

Redis commands:
  ZADD leaderboard score user_id      // O(log n) update
  ZREVRANGE leaderboard 0 9           // Top 10, O(log n + 10)
  ZREVRANK leaderboard user_id        // User's rank, O(log n)
```

---

## 3.2 AST-Based Code Analysis for Children's Hints

### How It Works
```
Student Code -> Lexer -> Parser -> AST -> Pattern Matcher -> Hints

AST Node Types (Python example):
  Module
  ├── FunctionDef (name, args, body)
  ├── For (target, iter, body)
  ├── If (test, body, orelse)
  ├── Assign (targets, value)
  ├── Call (func, args, keywords)
  └── ...
```

### Hint Generation System
```python
import ast

class CodeAnalyzer(ast.NodeVisitor):
    """Analyze children's Python code and generate pedagogical hints."""

    def __init__(self):
        self.hints = []
        self.patterns = []

    def visit_For(self, node):
        # Check for common beginner mistakes
        if isinstance(node.iter, ast.Call):
            if hasattr(node.iter.func, 'id') and node.iter.func.id == 'range':
                if len(node.iter.args) == 1:
                    # range(n) used correctly
                    self.patterns.append("for_loop_range")
                elif len(node.iter.args) == 0:
                    self.hints.append({
                        "type": "error",
                        "line": node.lineno,
                        "message": "range()에 숫자를 넣어야 해요! 예: range(5)",
                        "severity": "critical"
                    })

        # Check for empty loop body
        if len(node.body) == 1 and isinstance(node.body[0], ast.Pass):
            self.hints.append({
                "type": "suggestion",
                "line": node.lineno,
                "message": "반복문 안에 실행할 코드를 넣어보세요!",
                "severity": "info"
            })

        self.generic_visit(node)

    def visit_If(self, node):
        # Detect assignment instead of comparison
        if isinstance(node.test, ast.NamedExpr) or \
           isinstance(node.test, ast.Constant):
            self.hints.append({
                "type": "warning",
                "line": node.lineno,
                "message": "if 다음에는 비교(==)를 사용해요. 혹시 = 대신 == 을 쓰려고 했나요?",
                "severity": "warning"
            })
        self.generic_visit(node)

    def check_style(self, tree):
        """Check coding style appropriate for learning level."""
        # Detect overly long functions
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                body_lines = node.end_lineno - node.lineno
                if body_lines > 15:
                    self.hints.append({
                        "type": "style",
                        "line": node.lineno,
                        "message": f"함수가 {body_lines}줄이에요. 작은 함수로 나눠보는 건 어때요?",
                        "severity": "suggestion"
                    })

    def compare_to_solution(self, student_ast, solution_ast):
        """Compare student's approach to model solution via AST structure."""
        student_patterns = self._extract_patterns(student_ast)
        solution_patterns = self._extract_patterns(solution_ast)

        missing = solution_patterns - student_patterns
        for pattern in missing:
            self.hints.append({
                "type": "approach",
                "message": f"'{pattern}' 패턴을 사용해보세요!",
                "severity": "hint"
            })
```

### Progressive Hint System (3 Levels)
```
Level 1 (Nudge):    "이 문제에서는 반복문이 필요해요"
Level 2 (Direction): "for 반복문을 사용해서 리스트의 각 항목을 확인해보세요"
Level 3 (Scaffold):  "for item in my_list: 로 시작해보세요. 그 다음에는?"

Hint escalation logic:
  - Show Level 1 after 2 minutes of no progress
  - Show Level 2 after 1 more minute or 3 failed attempts
  - Show Level 3 after 2 more minutes or 5 failed attempts
  - NEVER show the full solution directly
```

---

## 3.3 AI-Assisted Learning in Educational Contexts

### Research Findings
- GitHub Copilot solutions place in **top 25% of students** on intro programming assignments
- Excessive dependence **diminishes creative problem-solving** and leads to **superficial comprehension**
- Best approach: AI as a **debugging tutor**, not a code generator

### Recommended Architecture for 코딩쏙
```
"Teachable Agent" Pattern (HypoCompass approach):
  - Student TEACHES the AI agent to debug code
  - AI deliberately makes mistakes for student to find
  - Student hypothesizes cause of errors
  - AI handles code completion; student focuses on logic
  - Result: +12% improvement in debugging skills

Implementation:
  1. AI generates code with intentional bug(s) matching student's level
  2. Student identifies and explains the bug
  3. AI asks clarifying questions ("왜 여기가 틀렸다고 생각해요?")
  4. Student fixes the code
  5. AI validates and provides feedback
  6. Never: AI writes the solution for the student
```

---

# 4. LEARNING ANALYTICS & PREDICTION

## 4.1 Learning Analytics Framework (LAK/SoLAR)

### Four Levels of Analytics
```
1. DESCRIPTIVE:  "What happened?"
   - Login frequency, time on task, completion rates
   - Visual: dashboards, charts, comparisons to class average

2. DIAGNOSTIC:   "Why did it happen?"
   - Correlation between video watching and quiz scores
   - Identifying which concepts cause the most errors

3. PREDICTIVE:   "What will happen?"
   - ML models predicting dropout/struggle
   - Accuracy: 80-95% (Random Forest, XGBoost)

4. PRESCRIPTIVE: "What should we do about it?"
   - Automated recommendations for intervention
   - "Student X should review loops before attempting functions"
   - This is the LEAST implemented level in current platforms
```

### Key Metrics That Actually Predict Student Success
```
Strongest Predictors (from research):
  1. Assignment completion rate (strongest single predictor)
  2. Time between assignment release and first attempt
  3. Number of login sessions per week (regularity > total time)
  4. Forum/help-seeking behavior
  5. Error rate trajectory (improving vs. static vs. declining)
  6. Failed attempts before success (productive struggle indicator)
  7. Streak consistency (daily practice regularity)

Weaker Predictors (commonly tracked but less predictive):
  - Total time on platform (quantity ≠ quality)
  - Number of pages viewed
  - Video watch time (often left playing in background)
```

---

## 4.2 Early Warning System Architecture

### Data Pipeline
```
[Student Interactions] -> [Event Stream] -> [Feature Engineering] -> [ML Model] -> [Alert System]
       |                                          |                       |              |
  clicks, submissions,                    rolling windows,          Random Forest,   Teachers,
  time on task,                          trend calculations,       XGBoost,          Parents,
  errors, help requests                  comparison to cohort      Neural Net        Student
```

### Feature Engineering for Coding Platform
```python
def compute_student_features(student_id, window_days=7):
    return {
        # Activity features
        "sessions_this_week": count_sessions(student_id, window_days),
        "avg_session_duration_minutes": avg_duration(student_id, window_days),
        "days_since_last_login": days_since_last(student_id),

        # Performance features
        "exercises_completed_this_week": count_completed(student_id, window_days),
        "first_attempt_success_rate": first_attempt_rate(student_id, window_days),
        "avg_attempts_per_exercise": avg_attempts(student_id, window_days),
        "error_rate_trend": error_trend(student_id, window_days),  # slope

        # Engagement features
        "hints_requested_ratio": hints_per_exercise(student_id, window_days),
        "time_to_first_keypress": avg_think_time(student_id, window_days),
        "code_deletion_ratio": deletions_vs_additions(student_id, window_days),

        # Progress features
        "concepts_mastered_total": mastered_count(student_id),
        "concepts_mastered_this_week": new_mastery_count(student_id, window_days),
        "current_streak_days": streak_length(student_id),

        # Frustration signals
        "rapid_resubmission_count": rapid_submits(student_id, window_days),
        "session_abandonment_rate": abandoned_sessions(student_id, window_days),
        "avg_time_after_error": time_after_error(student_id, window_days),
    }
```

### Risk Classification
```
Risk Score Calculation (ensemble model):

risk_score = model.predict_proba(features)[dropout_class]

Risk Levels:
  0.0 - 0.2:  Thriving     (Green)  - No intervention needed
  0.2 - 0.4:  On Track     (Blue)   - Standard monitoring
  0.4 - 0.6:  At Risk      (Yellow) - Automated nudge + teacher alert
  0.6 - 0.8:  High Risk    (Orange) - Teacher outreach + parent notification
  0.8 - 1.0:  Critical     (Red)    - Immediate personal contact
```

---

## 4.3 Frustration Detection from Code Submissions

### Behavioral Signals
```
Signal: Rapid Resubmission
  - 3+ submissions within 60 seconds
  - Indicates: frustrated "rage submitting"

Signal: Code Deletion Spike
  - Deleting > 50% of code and rewriting
  - Indicates: confusion about approach

Signal: Session Abandonment
  - Leaving in middle of exercise (no completion, no navigation)
  - Especially after multiple failed attempts

Signal: Decreasing Code Complexity
  - Student simplifying their approach after failures
  - Removing loops, conditions -> reverting to simpler patterns

Signal: Help-Seeking Escalation
  - Requesting hints at Level 3 repeatedly
  - Skipping exercises

Signal: Time Anomalies
  - Very long pauses (> 3 min without typing) = confusion/giving up
  - Very short times (< 10 sec per exercise) = not engaging
```

### Intervention Triggers
```python
def check_frustration(student_id, current_exercise):
    signals = {
        "rapid_resubmit": count_submits_last_60s(student_id) >= 3,
        "high_delete_ratio": deletion_ratio(student_id) > 0.5,
        "long_pause": seconds_since_last_action(student_id) > 180,
        "hint_escalation": hints_used(student_id, current_exercise) >= 3,
        "error_streak": consecutive_errors(student_id) >= 5,
    }

    frustration_score = sum(signals.values()) / len(signals)

    if frustration_score >= 0.6:
        trigger_intervention("empathy_message", student_id)
        # "어려운 문제를 만났구나! 잠깐 쉬고 다시 해볼까?"
        offer_easier_alternative(student_id, current_exercise)
        notify_teacher(student_id, frustration_score)
    elif frustration_score >= 0.4:
        trigger_intervention("encouragement", student_id)
        # "거의 다 왔어! 힌트 하나 볼래?"
        offer_progressive_hint(student_id, current_exercise)
```

---

## 4.4 Learning Health Score Dashboard

### Student Health Score Composite
```
learning_health_score = weighted_average({
    "engagement":   0.25,  // login frequency, session duration, streak
    "progress":     0.25,  // new concepts mastered, exercises completed
    "performance":  0.20,  // accuracy, first-attempt success rate
    "consistency":  0.15,  // regularity of practice, variance in activity
    "growth":       0.15,  // improvement trajectory, error rate trend
})

Each component scored 0-100, overall score 0-100.

Display as:
  90-100: "최고에요!" (Excellent) - Star icon
  70-89:  "잘하고 있어요!" (Doing well) - Sun icon
  50-69:  "조금 더 힘내요!" (Keep going) - Cloud icon
  30-49:  "도움이 필요해요" (Needs help) - Rain icon
  0-29:   "관심이 필요해요" (Needs attention) - Alert icon
```

### Teacher Dashboard Metrics
```
Class-level view:
  - Distribution of health scores (histogram)
  - Students needing attention (sorted by risk)
  - Concept mastery heatmap (students x concepts)
  - Average session duration trends
  - Completion rate by lesson/concept
  - Most common error patterns

Individual student view:
  - Health score with trend arrow (↑↓→)
  - Skill mastery radar chart
  - Activity timeline (when they practice)
  - Error pattern analysis
  - Recommended next actions for teacher
```

---

# 5. PARENT ENGAGEMENT SYSTEMS

## 5.1 ClassDojo/Seesaw Design Patterns

### Core Communication Architecture
```
Communication Types:
  1. Automated Progress Updates (system-generated)
     - Weekly summary reports
     - Milestone achievements
     - Streak notifications

  2. Teacher-Initiated Messages
     - Individual feedback
     - Class announcements
     - Photo/video of student work

  3. Parent-Initiated Messages
     - Questions about progress
     - Schedule changes
     - Technical issues

Key Design: Two-Way but Structured
  - NOT open chat (reduces teacher burden)
  - Templated responses for common scenarios
  - Translation support for multilingual families
```

### Parent Portal Features for 코딩쏙
```
Weekly Report (Auto-generated):
  ┌──────────────────────────────────────────┐
  │  [자녀이름]의 이번 주 코딩 리포트         │
  │                                          │
  │  학습 시간: 2시간 15분 (지난주 +30분)     │
  │  완료한 문제: 12개                        │
  │  새로 배운 개념: 반복문, 조건문            │
  │  연속 학습일: 5일 🔥                      │
  │  레벨: 새싹 (Level 7)                    │
  │                                          │
  │  이번 주 잘한 점:                         │
  │  - 반복문을 처음으로 혼자서 완성했어요!    │
  │  - 5일 연속으로 학습했어요!               │
  │                                          │
  │  다음 주 목표:                            │
  │  - 함수 개념 시작하기                     │
  │  - 미니 프로젝트 완성하기                 │
  │                                          │
  │  [자녀의 작품 보기] [상세 리포트 보기]     │
  └──────────────────────────────────────────┘
```

### Push Notification Strategy (Non-Annoying)
```
Notification Categories & Frequency:

CELEBRATION (max 2/week):
  - "오늘 [이름]이 새로운 레벨에 도달했어요!"
  - "이번 주 목표를 달성했어요!"

PROGRESS (max 1/week):
  - Weekly summary available notification

CONCERN (only when needed):
  - "3일 동안 학습하지 않았어요. 응원 메시지를 보내볼까요?"

NEVER send:
  - Daily reminders to practice (that's the child's responsibility)
  - Comparison with other children
  - Negative performance alerts without context

Opt-in Levels:
  Essential: Billing + major milestones only
  Standard:  + weekly reports + achievements
  Detailed:  + daily activity summary
```

### Parent Engagement Patterns That Work
```
1. CELEBRATE, DON'T MONITOR
   - Focus reports on achievements, not deficiencies
   - "Your child created their first game!" > "Your child failed 3 exercises"

2. SHOW THE CREATION, NOT THE GRADE
   - Share the actual project/game the child built
   - Interactive: parent can PLAY the child's game
   - Creates dinner-table conversation starters

3. ACTIONABLE SUGGESTIONS
   - "Ask [이름] to show you the game they made today"
   - "Try this coding challenge together as a family"
   - NOT: "Your child needs to practice more"

4. RESPECT PARENT TIME
   - 60-second readable reports (mobile-first)
   - Key metrics visible without scrolling
   - Detailed data available on tap, not pushed
```

---

# 6. MICROLEARNING & SPACED REPETITION FOR CODING

## 6.1 Ebbinghaus Forgetting Curve Applied to Programming

### The Forgetting Curve Formula
```
R = e^(-t/S)

Where:
  R = retention (0 to 1)
  t = time since learning
  S = stability of memory (strength)

Without review, retention drops to:
  After 1 hour:  ~44% retained
  After 1 day:   ~33% retained
  After 1 week:  ~25% retained
  After 1 month: ~21% retained
```

### Optimal Review Schedule for Coding Concepts
```
Review Schedule (adapted for children's coding):

Initial learning:     Day 0  (first encounter)
Review 1:             Day 1  (next day)
Review 2:             Day 3  (two days later)
Review 3:             Day 7  (one week)
Review 4:             Day 14 (two weeks)
Review 5:             Day 30 (one month)
Review 6:             Day 60 (two months)

Each successful review multiplies the interval by ~2.5x
Each failed review resets to shorter interval
```

### Coding Concept Categories by Decay Rate
```
Fast Decay (needs frequent review):
  - Syntax details (semicolons, brackets, indentation rules)
  - Built-in function names and parameters
  - Error message meanings

Medium Decay:
  - Algorithm patterns (sorting, searching)
  - Data structure operations (list methods, dict access)
  - Control flow patterns (nested loops, recursion)

Slow Decay (procedural/conceptual):
  - What a variable IS (conceptual understanding)
  - What a loop DOES (conceptual understanding)
  - Debugging strategies (metacognitive skills)

Design implication: Review exercises should focus on fast-decay
items more frequently, while conceptual understanding can be
reinforced through projects at longer intervals.
```

---

## 6.2 SM-2 Algorithm (Adapted for Coding)

### Complete SM-2 Implementation
```python
class SM2CodeReview:
    """SM-2 spaced repetition adapted for coding exercises."""

    def __init__(self):
        self.items = {}  # concept_id -> SM2Item

    def add_concept(self, concept_id):
        self.items[concept_id] = {
            "repetitions": 0,
            "ease_factor": 2.5,
            "interval": 0,       # days
            "next_review": today(),
        }

    def review(self, concept_id, quality):
        """
        quality: 0-5 rating
          0: Complete blackout (couldn't even start)
          1: Incorrect, but recognized the concept when shown answer
          2: Incorrect, but answer felt familiar
          3: Correct with significant difficulty
          4: Correct with minor hesitation
          5: Perfect, immediate recall

        For children's coding, simplify to 3 buttons:
          "어려웠어요" (Hard)     -> quality = 2
          "할 만했어요" (Good)    -> quality = 4
          "쉬웠어요!" (Easy)     -> quality = 5
        """
        item = self.items[concept_id]

        if quality >= 3:  # Correct response
            if item["repetitions"] == 0:
                item["interval"] = 1
            elif item["repetitions"] == 1:
                item["interval"] = 6
            else:
                item["interval"] = round(item["interval"] * item["ease_factor"])

            item["repetitions"] += 1
        else:  # Incorrect response
            item["repetitions"] = 0
            item["interval"] = 1
            # Don't change ease_factor on failure

        # Update ease factor
        item["ease_factor"] = max(1.3,
            item["ease_factor"] + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
        )

        item["next_review"] = today() + timedelta(days=item["interval"])
        return item

    def get_due_reviews(self):
        """Get all concepts due for review today."""
        return [
            cid for cid, item in self.items.items()
            if item["next_review"] <= today()
        ]
```

### FSRS (Free Spaced Repetition Scheduler) - Modern Alternative
```
FSRS uses Three Component Model of Memory:

  R (Retrievability): Probability of recall at a given moment
  S (Stability):      Days for R to decline from 100% to 90%
  D (Difficulty):     Inherent complexity affecting stability growth

Key advantage over SM-2:
  - Uses machine learning to optimize parameters per-user
  - Better handles delayed reviews
  - User sets desired retention target (e.g., 90%)
  - Algorithm calculates optimal intervals automatically

For 코딩쏙, FSRS is recommended over SM-2 because:
  - Children's learning patterns are more variable
  - ML-based optimization adapts to individual children
  - Simpler user interface (just answer + self-rate)
```

---

## 6.3 Leitner System for Code Exercises

### System Design
```
5-Box Leitner System for Coding:

Box 1: Review every session     (new/difficult concepts)
Box 2: Review every 2 sessions  (learning)
Box 3: Review every 4 sessions  (familiar)
Box 4: Review every 8 sessions  (comfortable)
Box 5: Review every 16 sessions (mastered)

Rules:
  - Correct answer: Move card to next box (1->2, 2->3, etc.)
  - Incorrect answer: Move card back to Box 1 (always!)
  - New concept: Starts in Box 1

Implementation for coding:
  Each "card" = a micro-coding challenge (2-5 min)

  Examples:
  Box 1 card: "Write a for loop that prints 1 to 5"
  Box 3 card: "What does this code output? [code snippet]"
  Box 5 card: "Debug this function that should reverse a list"
```

### Session Structure (Leitner + Microlearning)
```
Daily Coding Session (~15-20 min for children):

Phase 1: Warm-up Review (5 min)
  - 3-5 cards from Boxes 1-2 (spaced repetition review)
  - Quick code-reading or fill-in-the-blank exercises

Phase 2: New Learning (8-10 min)
  - 1 new concept introduction (video/interactive, max 3 min)
  - 2-3 guided practice exercises
  - 1 independent exercise

Phase 3: Cool-down Challenge (3-5 min)
  - 1 creative/open-ended mini-challenge
  - Uses concepts from today AND previous sessions
  - This creates the "desirable difficulty" that strengthens memory
```

---

## 6.4 Optimal Session Length for Children (Research-Based)

### Attention Span by Age (Research Consensus)
```
Age  | Sustained Attention | Recommended Session | Break Frequency
-----|--------------------|--------------------|----------------
5-6  | 10-15 min          | 10-12 min          | Every 10 min
7-8  | 15-20 min          | 15-18 min          | Every 15 min
9-10 | 20-30 min          | 20-25 min          | Every 20 min
11-12| 25-35 min          | 25-30 min          | Every 25 min
13+  | 30-45 min          | 30-40 min          | Every 30 min

Formula: attention_span_minutes ≈ age_years * 2 to 3
```

### Session Design Recommendations
```
For 코딩쏙 (targeting ages 7-13):

Format: Modified Pomodoro for Kids
  - Work block: 15-20 minutes
  - Break: 3-5 minutes (movement/fun activity)
  - Second block (optional): 15-20 minutes
  - Maximum per sitting: 40 minutes total

Within each 15-20 minute block:
  - Switch activity type every 5-7 minutes
  - Alternate: reading code -> writing code -> debugging -> creating
  - Include physical interactions (drag-drop, drawing) for younger kids
  - End each block on a SUCCESS (not mid-struggle)

Multi-modal engagement:
  - Visual: animations, colorful code highlighting
  - Auditory: sound effects for correct/incorrect
  - Kinesthetic: drag-and-drop, drawing
  - Social: pair challenges, sharing creations
```

---

# 7. SOCIAL LEARNING & COLLABORATION

## 7.1 Scratch Community: Peer Learning Design

### Core Social Features
```
1. Project Sharing
   - One-click publish to community
   - "See Inside" button -> view anyone's code
   - "Remix" button -> fork and modify any project
   - Remix tree shows lineage of remixed projects

2. Studios
   - Themed collections curated by students
   - Students can add their projects to relevant studios
   - Studio comments enable focused discussion

3. Comments & Feedback
   - Project-level comments (below the project)
   - Profile-level comments
   - Moderated by community guidelines + AI filters

4. Following & Activity Feed
   - Follow other creators
   - See their new projects in activity feed
   - Creates parasocial motivation to create
```

### Why Scratch's Social Model Works
```
Key Insight: CREATION precedes SHARING precedes LEARNING

Traditional:  Learn -> Practice -> (maybe) Share
Scratch:      Create -> Share -> Get feedback -> Learn from others -> Create better

9 out of 10 teachers incorporated structured peer collaboration:
  - Peer mentoring programs
  - "Show and Tell" sessions
  - Sentence starters for giving code feedback
  - Buddy programming (side-by-side, not driver/navigator)

The "low floor, high ceiling, wide walls" design:
  - Low floor: Easy to start (drag blocks)
  - High ceiling: Complex projects possible
  - Wide walls: Many types of projects (games, art, stories, music)
```

### Implementing for 코딩쏙
```
Social Features Priority:

Phase 1 (MVP):
  - Project gallery (view classmates' work)
  - "좋아요" (Like) button
  - "코드 보기" (View Code) button

Phase 2:
  - Remix/Fork functionality
  - Studio/Collection creation
  - Comment system (moderated)

Phase 3:
  - Following/Feed system
  - Collaborative real-time coding
  - Code review assignments
```

---

## 7.2 Code Review as a Learning Tool for Children

### Simplified Code Review for Kids
```
Traditional Code Review: Too formal, intimidating for children

Adapted "Code Explorer" System:

  1. MYSTERY CODE (reading comprehension)
     - Show anonymous code snippet
     - "What does this code do?"
     - Multiple choice or free-text answer
     - Teaches code reading skills

  2. BUG HUNTER (debugging review)
     - Show code with intentional bug
     - "Find and fix the bug!"
     - Gamified: earn "Bug Hunter" badges

  3. CODE COMPLIMENT (positive review)
     - Show classmate's code
     - "What do you like about this code?"
     - Pick from structured options:
       * "변수 이름이 이해하기 쉬워요"
       * "코드가 깔끔해요"
       * "재미있는 아이디어에요"
       * "좋은 방법을 사용했어요"

  4. IMPROVEMENT SUGGESTION (constructive review)
     - Only after reaching Level 10+
     - Structured format: "만약 ___을/를 바꾸면 ___해질 것 같아요"
     - All suggestions reviewed by teacher before delivery
```

---

## 7.3 Pair Programming for Children (Research-Based)

### Research Results
```
Key finding: Pair programming positively improved:
  - Programming & computational thinking skills
  - Learning motivation
  - Metacognition
  - Collaboration skills
  - Code quality (fewer common mistakes)

Cognitive benefit: Reduces cognitive load by sharing
the load between two learners.
```

### Implementation for 코딩쏙
```
"코딩 짝꿍" (Coding Buddy) System:

Roles (rotate every 5-7 minutes with timer):
  운전자 (Driver): Types the code, controls the editor
  안내자 (Navigator): Thinks ahead, spots errors, suggests ideas

Matching Algorithm:
  - Pair students with SIMILAR skill levels (research shows this works better)
  - Avoid always pairing the same students
  - Consider personality: quiet + quiet can work; avoid dominant + passive

Session Structure:
  1. Read challenge together (1 min)
  2. Discuss approach (2 min)
  3. Code together with role switching (10-15 min)
  4. Test and debug together (3 min)
  5. Reflect: "What did we learn?" (2 min)

Technical Implementation:
  - Shared real-time editor (like Google Docs for code)
  - Visible cursor for each user (different colors)
  - Built-in timer for role switching
  - Audio/video chat (optional)
  - "Raise Hand" button for teacher help
```

---

## 7.4 Building Learning Communities That Sustain Engagement

### Community Engagement Loop
```
[Create] -> [Share] -> [Get Feedback] -> [Feel Belonging] -> [Create More]
                           |
                    [Discover Others' Work]
                           |
                    [Remix/Improve] -> [Share Remix]

Sustaining Factors:
  1. Regular Events (weekly challenges, themed jams)
  2. Recognition (featured projects, creator spotlights)
  3. Mentorship (advanced students help beginners)
  4. Identity (avatars, profiles, portfolios)
  5. Purpose (create for an audience, not just for grades)
```

### Weekly Community Rhythm for 코딩쏙
```
Monday:    New weekly challenge announced
Tuesday:   Hint/tip related to challenge concept
Wednesday: Mid-week "code snapshot" sharing
Thursday:  Pair programming day
Friday:    Challenge submissions due + community voting
Saturday:  Winners announced + "Creator Spotlight" feature
Sunday:    Rest day (streak freeze automatic)
```

---

# APPENDIX: RECOMMENDED TECH STACK FOR 코딩쏙

```
Frontend:
  - Next.js (React) for web platform
  - Monaco Editor (VS Code's editor) for code editing
  - Socket.io for real-time collaboration
  - Framer Motion for animations/celebrations

Backend:
  - Node.js/Express or Next.js API routes
  - PostgreSQL for structured data (users, progress, courses)
  - Redis for leaderboards, sessions, caching
  - RabbitMQ/Bull for code execution queue

Code Execution:
  - Judge0 (self-hosted) for sandboxed execution
  - Docker containers per submission
  - Support: Python, JavaScript, Scratch (transpiled)

AI/ML:
  - OpenAI GPT-4 for Socratic tutoring
  - Custom BKT/HLR models (Python/PyTorch)
  - AST analysis (Python ast module, Babel for JS)

Analytics:
  - ClickHouse or TimescaleDB for event data
  - Metabase/Grafana for dashboards
  - Custom ML models for risk prediction

Communication:
  - FCM (Firebase Cloud Messaging) for push notifications
  - SendGrid/Postmark for email reports
  - KakaoTalk API for Korean parent notifications
```

---

# REFERENCES

Primary research papers and technical sources consulted:
1. Settles & Meeder (2016). "A Trainable Spaced Repetition Model for Language Learning." ACL 2016.
2. Corbett & Anderson (1995). "Knowledge Tracing: Modeling the Acquisition of Procedural Knowledge."
3. Doignon & Falmagne (2011). "Learning Spaces." Springer-Verlag.
4. Wozniak (1990). "SuperMemo 2 Algorithm" - SM-2 specification.
5. Duolingo Research. "A Sleeping, Recovering Bandit Algorithm for Optimizing Recurring Notifications." KDD 2020.
6. Multiple meta-analyses on gamification effectiveness (2019-2025) from Educational Psychology Review, Frontiers in Psychology.
