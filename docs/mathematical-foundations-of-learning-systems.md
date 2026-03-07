# Mathematical Foundations of Learning Systems
## Technical Reference for Coding Education Platform Design

---

## Table of Contents
1. [Information Theory of Learning](#1-information-theory-of-learning)
2. [Item Response Theory (IRT)](#2-item-response-theory-irt)
3. [Bayesian Knowledge Tracing (BKT)](#3-bayesian-knowledge-tracing-bkt)
4. [Deep Knowledge Tracing & Neural Models](#4-deep-knowledge-tracing--neural-models)
5. [Spaced Repetition Algorithms](#5-spaced-repetition-algorithms)
6. [Mastery Learning Models](#6-mastery-learning-models)
7. [Multi-Armed Bandits for Exercise Selection](#7-multi-armed-bandits-for-exercise-selection)
8. [Graph Theory for Curriculum](#8-graph-theory-for-curriculum)
9. [Markov Decision Processes for Teaching](#9-markov-decision-processes-for-teaching)
10. [Practical Algorithm Selection](#10-practical-algorithm-selection)

---

## 1. Information Theory of Learning

### 1.1 Shannon Entropy of Knowledge States

A student's knowledge state can be modeled as a random variable X over possible states. The **entropy** measures uncertainty about the student's current knowledge:

```
H(X) = -SUM_x P(x) * log2(P(x))
```

- **High entropy**: Student's knowledge is unpredictable (we don't know what they know).
- **Low entropy**: We have confident knowledge of their state.
- **Maximum entropy**: H_max = log2(N) when all N states are equiprobable.

For a binary knowledge model (knows/doesn't know) over K concepts:

```
H(K) = -SUM_{i=1}^{K} [p_i * log2(p_i) + (1-p_i) * log2(1-p_i)]
```

where p_i = P(student has mastered concept i).

### 1.2 Information Gain per Lesson

When we teach a lesson (action A), the **information gain** is the reduction in entropy:

```
IG(X; A) = H(X_before) - H(X_after | A)
```

This is equivalent to the **mutual information** between the teaching action and the resulting knowledge state:

```
I(X; A) = H(X) - H(X|A) = H(A) - H(A|X)
       = SUM_{x,a} P(x,a) * log2(P(x,a) / (P(x) * P(a)))
```

**Interpretation**: A lesson with high mutual information is one where knowing the student's state strongly predicts which lesson to give (and vice versa). A generic lecture has low MI; a personalized explanation has high MI.

### 1.3 Surprise and Information Content

The **information content** (surprisal) of observing a student get question q correct/incorrect:

```
I(event) = -log2(P(event))
```

- Student gets easy question correct (P=0.95): I = 0.074 bits (low surprise, low information)
- Student gets hard question correct (P=0.2): I = 2.32 bits (high surprise, high information)
- Student gets medium question wrong (P=0.5): I = 1.0 bit

**Optimal questioning** targets questions where P(correct) is near 0.5, maximizing expected information per question (1 bit).

### 1.4 KL Divergence for Measuring Learning

The **Kullback-Leibler divergence** measures how much a student's knowledge distribution has shifted:

```
D_KL(P_after || P_before) = SUM_x P_after(x) * log2(P_after(x) / P_before(x))
```

This is always >= 0, equaling 0 only when the distributions are identical (no learning occurred).

### 1.5 Kolmogorov Complexity of Programming Concepts

The **Kolmogorov complexity** K(x) of a programming concept is the length of the shortest program that produces/explains that concept. While not directly computable, it provides a framework for ranking concept difficulty:

| Concept | Approximate K (relative) | Rationale |
|---|---|---|
| Variable assignment | Low | `x = 5` — minimal description |
| For loop | Medium | Requires iteration + counter + body |
| Recursion | High | Self-reference + base case + stack concept |
| Dynamic programming | Very high | Requires recursion + memoization + subproblem decomposition |

**Practical proxy**: Count the number of prerequisite concepts required to fully explain a new concept. This correlates with K(concept).

### 1.6 Channel Capacity of Teaching

Modeling teaching as a noisy communication channel:

```
C = max_{P(x)} I(X; Y)
```

where X is the taught content and Y is what the student actually learns. The noise comes from:
- Attention lapses
- Misconceptions (systematic noise)
- Cognitive load limits

**Implementation note**: Can run as pure math in any Edge Function. No ML required.

---

## 2. Item Response Theory (IRT)

### 2.1 The Models

**1PL (Rasch Model):**
```
P(correct | theta, b) = 1 / (1 + exp(-(theta - b)))
```
- theta = student ability (latent trait)
- b = item difficulty

**2PL Model:**
```
P(correct | theta, a, b) = 1 / (1 + exp(-a(theta - b)))
```
- a = discrimination parameter (steepness of the sigmoid)

**3PL Model:**
```
P(correct | theta, a, b, c) = c + (1 - c) / (1 + exp(-a(theta - b)))
```
- c = guessing parameter (lower asymptote, typically 1/num_choices for MCQ)

**4PL Model:**
```
P(correct | theta, a, b, c, d) = c + (1 - c - d) / (1 + exp(-a(theta - b)))
```
- d = carelessness/slip parameter (upper asymptote deficit)

### 2.2 Fisher Information for Optimal Item Selection

The **Fisher information** for the 2PL model at ability theta:

```
I_i(theta) = a_i^2 * P_i(theta) * Q_i(theta)
```

where Q_i(theta) = 1 - P_i(theta).

For the **3PL model**:

```
I_i(theta) = a_i^2 * Q_i(theta) / P_i(theta) * [(P_i(theta) - c_i) / (1 - c_i)]^2
```

**Test information** (sum over all items):
```
I(theta) = SUM_{i=1}^{n} I_i(theta)
```

**Standard error** of ability estimate:
```
SE(theta) = 1 / sqrt(I(theta))
```

### 2.3 Computerized Adaptive Testing (CAT) Algorithm

```
ALGORITHM: CAT with Maximum Fisher Information

1. Initialize: theta_0 = 0 (prior mean ability)
2. For each question t = 1, 2, 3, ...:
   a. SELECT item i* that maximizes I_i(theta_{t-1})
      i* = argmax_i I_i(theta_{t-1})  [from unused items]
   b. ADMINISTER item i* to student
   c. OBSERVE response x_t in {0, 1}
   d. UPDATE theta via MLE:
      theta_t = argmax_theta SUM_{k=1}^{t} [x_k * log(P_k(theta)) + (1-x_k) * log(Q_k(theta))]
   e. CHECK stopping rule:
      - SE(theta_t) < threshold (e.g., 0.3), OR
      - t >= max_items, OR
      - All content areas covered
3. Return theta_t as final ability estimate
```

### 2.4 MLE Estimation (Newton-Raphson)

For estimating theta given responses {x_1, ..., x_n}:

**Log-likelihood:**
```
L(theta) = SUM_{i=1}^{n} [x_i * log(P_i(theta)) + (1-x_i) * log(1 - P_i(theta))]
```

**Score (first derivative):**
```
L'(theta) = SUM_{i=1}^{n} a_i * (x_i - P_i(theta))    [for 2PL]
```

**Newton-Raphson update:**
```
theta_{new} = theta_{old} + L'(theta_old) / I(theta_old)
```

Converges in 3-5 iterations typically.

### 2.5 Bayesian Estimation (EAP)

With a prior P(theta) ~ N(mu_0, sigma_0^2):

**Expected A Posteriori (EAP):**
```
theta_EAP = integral(theta * L(data|theta) * P(theta) d_theta) / integral(L(data|theta) * P(theta) d_theta)
```

Approximated via quadrature with ~40 points.

### 2.6 Implementation Complexity

| Operation | Complexity | Edge Function? |
|---|---|---|
| Score one item | O(1) | Yes |
| Update theta (Newton-Raphson) | O(n * iterations) | Yes, n < 1000 items |
| Select next CAT item | O(item_bank_size) | Yes, < 10000 items |
| Full parameter calibration | O(n_students * n_items * iterations) | No, offline batch |

---

## 3. Bayesian Knowledge Tracing (BKT)

### 3.1 The Hidden Markov Model

BKT (Corbett & Anderson, 1994) models knowledge as a two-state HMM:

**States**: L (learned), ~L (not learned)
**Observations**: C (correct), ~C (incorrect)

**Four parameters per knowledge component (KC):**

| Parameter | Symbol | Meaning | Typical Range |
|---|---|---|---|
| Prior knowledge | P(L_0) | Initial probability of mastery | 0.0 - 0.5 |
| Learn rate | P(T) | Probability of transitioning from ~L to L | 0.01 - 0.4 |
| Guess | P(G) | P(correct | ~L) | 0.0 - 0.3 |
| Slip | P(S) | P(incorrect | L) | 0.0 - 0.2 |

**Transition matrix:**
```
             L_{t+1}    ~L_{t+1}
L_t    [     1           0       ]
~L_t   [     P(T)        1-P(T)  ]
```

Note: Once learned, a student stays learned (no forgetting in standard BKT).

**Emission (observation) matrix:**
```
             Correct     Incorrect
L     [     1-P(S)       P(S)     ]
~L    [     P(G)         1-P(G)   ]
```

### 3.2 The Update Equations

**Step 1: Predict observation probability**
```
P(correct_t) = P(L_t) * (1 - P(S)) + (1 - P(L_t)) * P(G)
```

**Step 2: Posterior update given observation**

If the student answers **correctly**:
```
P(L_t | correct) = P(L_t) * (1 - P(S)) / P(correct_t)
```

If the student answers **incorrectly**:
```
P(L_t | incorrect) = P(L_t) * P(S) / (1 - P(correct_t))
```

**Step 3: Incorporate learning (transition)**
```
P(L_{t+1}) = P(L_t | obs_t) + (1 - P(L_t | obs_t)) * P(T)
```

### 3.3 Complete Update (Combined)

After observing response at time t:

```
P(L_{t+1}) = P(L_t | obs_t) + (1 - P(L_t | obs_t)) * P(T)
```

where:
```
P(L_t | correct) = [P(L_t) * (1-P(S))] / [P(L_t)*(1-P(S)) + (1-P(L_t))*P(G)]
P(L_t | incorrect) = [P(L_t) * P(S)] / [P(L_t)*P(S) + (1-P(L_t))*(1-P(G))]
```

### 3.4 Parameter Estimation via EM (Baum-Welch)

**E-step**: For each student sequence, compute forward-backward probabilities:

```
alpha_t(L) = P(obs_1, ..., obs_t, state_t = L)
beta_t(L) = P(obs_{t+1}, ..., obs_T | state_t = L)
gamma_t(L) = P(state_t = L | obs_1, ..., obs_T)
```

**M-step**: Re-estimate parameters:

```
P(L_0) = (1/N) * SUM_n gamma_1^n(L)
P(T) = SUM_{n,t} xi_t^n(~L, L) / SUM_{n,t} gamma_t^n(~L)
P(G) = SUM_{n,t} [gamma_t^n(~L) * I(obs_t = correct)] / SUM_{n,t} gamma_t^n(~L)
P(S) = SUM_{n,t} [gamma_t^n(L) * I(obs_t = incorrect)] / SUM_{n,t} gamma_t^n(L)
```

where xi_t^n(s, s') = P(state_t = s, state_{t+1} = s' | all observations for student n).

**Problem**: EM often converges to degenerate solutions (P(G) > 0.5, P(S) > 0.5). Use constraints:
- P(G) + P(S) < 1 (identifiability constraint)
- P(G) < 0.3, P(S) < 0.1 (practical constraint)

### 3.5 Extensions

**Individualized BKT (iBKT)**: Per-student P(L_0) and P(T):
```
P(L_0)_student = logistic(w^T * x_student)
```
where x_student is a feature vector (prior experience, pretest score, etc.)

**Contextual BKT**: Parameters depend on context (problem type, hint usage):
```
P(G | context) = logistic(w_G^T * features)
P(S | context) = logistic(w_S^T * features)
```

### 3.6 Implementation Complexity

| Operation | Complexity | Edge Function? |
|---|---|---|
| Single BKT update | O(1) | Yes, trivially |
| Predict P(correct) | O(1) | Yes |
| EM parameter fitting | O(N * T * iterations) | Offline only |
| Store per-student state | O(K) per student, K = num KCs | Yes, in DB |

**BKT is the most practical algorithm for a Supabase Edge Function.** A single update is just 3 multiplications and 2 additions.

---

## 4. Deep Knowledge Tracing & Neural Models

### 4.1 DKT (Piech et al., 2015) - LSTM Architecture

**Input encoding**: Each interaction (exercise_id, correct/incorrect) is one-hot encoded into a vector of dimension 2M (M = number of exercises):

```
x_t = one_hot(exercise_t + M * correct_t)   [dimension 2M]
```

**LSTM equations** (standard):
```
f_t = sigma(W_f * [h_{t-1}, x_t] + b_f)        // forget gate
i_t = sigma(W_i * [h_{t-1}, x_t] + b_i)        // input gate
c_tilde = tanh(W_c * [h_{t-1}, x_t] + b_c)     // candidate
c_t = f_t * c_{t-1} + i_t * c_tilde             // cell state
o_t = sigma(W_o * [h_{t-1}, x_t] + b_o)         // output gate
h_t = o_t * tanh(c_t)                           // hidden state
```

**Output**: Probability of correctly answering each exercise:
```
y_t = sigma(W_y * h_t + b_y)    [dimension M]
```

**Loss function** (binary cross-entropy on the next interaction):
```
L = -SUM_t [a_{t+1} * log(y_t[e_{t+1}]) + (1-a_{t+1}) * log(1 - y_t[e_{t+1}])]
```

where a_{t+1} is the actual correctness and e_{t+1} is the exercise index at time t+1.

**AUC**: ~0.85 vs BKT's ~0.68 on benchmark datasets.

### 4.2 SAKT (Self-Attentive Knowledge Tracing)

Replaces LSTM with Transformer self-attention:

**Input**: Interaction embeddings:
```
e_t = E_exercise[q_t] + E_response[a_t] + E_position[t]
```

**Self-attention**:
```
Q = e_t * W_Q    // query (current interaction)
K = E * W_K      // keys (all past interactions)
V = E * W_V      // values (all past interactions)

Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V
```

**Causal masking**: Future interactions are masked so the model only attends to past.

**Multi-head attention**:
```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W_O
where head_i = Attention(Q * W_Q^i, K * W_K^i, V * W_V^i)
```

**Feed-forward + output**:
```
FFN(x) = ReLU(x * W_1 + b_1) * W_2 + b_2
y_t = sigma(FFN(MultiHead(Q, K, V)))
```

### 4.3 AKT (Attentive Knowledge Tracing)

Key innovation: Integrates **Rasch model** embeddings with attention.

**Rasch-enhanced embeddings**:
```
x_t = c_{KC_t} + mu_{exercise_t} * d_{KC_t}
```
where:
- c_{KC_t} = knowledge concept embedding
- mu_{exercise_t} = scalar difficulty parameter (Rasch)
- d_{KC_t} = difficulty-direction vector

**Monotonic attention** with exponential decay:
```
alpha_{t,k} = softmax(Q_t * K_k^T / sqrt(d)) * exp(-theta * (t-k))
```

The exponential decay theta ensures recent interactions have more weight (recency effect).

**Architecture (4 modules)**:
1. Exercise encoder (exercise -> embedding via Rasch)
2. Knowledge encoder (interaction -> knowledge representation via attention)
3. Knowledge retriever (query current exercise against knowledge states)
4. Prediction layer

### 4.4 DKT2 (2025) - xLSTM + Rasch

Latest development combining extended LSTM (xLSTM) with IRT:
- Uses Rasch model for interpretable output
- xLSTM provides better long-range memory than standard LSTM
- Achieves state-of-the-art on multiple benchmarks

### 4.5 Implementation Complexity

| Model | Parameters | Training | Inference | Edge Function? |
|---|---|---|---|---|
| DKT (LSTM) | ~100K-1M | Hours (GPU) | ~10ms/student | No (too large) |
| SAKT | ~500K-5M | Hours (GPU) | ~20ms/student | No |
| AKT | ~1M-10M | Hours (GPU) | ~30ms/student | No |
| BKT | 4 per KC | Minutes (CPU) | <1ms/student | **Yes** |

**Verdict**: Neural models provide better accuracy but cannot run in Edge Functions. Use them for offline analytics; use BKT or IRT for real-time decisions.

---

## 5. Spaced Repetition Algorithms

### 5.1 Ebbinghaus Forgetting Curve

The original model of memory decay:

```
R(t) = e^(-t/S)
```

where:
- R = retrievability (probability of recall)
- t = time since last review
- S = memory stability (higher = slower forgetting)

**Half-life** (time to 50% recall):
```
h = S * ln(2)
```

### 5.2 SM-2 (SuperMemo 2) Algorithm

The most widely-used spaced repetition algorithm (used in Anki until FSRS).

**Interval calculation:**
```
I(1) = 1 day
I(2) = 6 days
I(n) = round(I(n-1) * EF)   for n > 2
```

**Easiness Factor (EF) update:**
```
EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
```

Simplified:
```
EF' = EF - 0.8 + 0.28*q - 0.02*q^2
```

where q = quality rating (0-5). EF is clamped to minimum 1.3.

**On failure** (q < 3): Reset repetition count to 0, I(1) = 1 day. EF is NOT changed.

**Initial EF**: 2.5 for all new items.

**EF change by quality:**
| q | EF change |
|---|---|
| 5 | +0.10 |
| 4 | 0.00 |
| 3 | -0.14 |
| 2 | -0.32 |
| 1 | -0.54 |
| 0 | -0.80 |

### 5.3 FSRS (Free Spaced Repetition Scheduler) - v4.5/v5/v6

The modern algorithm now used in Anki. Three core variables: **Difficulty (D)**, **Stability (S)**, **Retrievability (R)**.

#### Retrievability (Forgetting Curve)

**FSRS v3:**
```
R(t, S) = 0.9^(t/S)
```

**FSRS v4:**
```
R(t, S) = (1 + t/(9*S))^(-1)
```

**FSRS v4.5:**
```
R(t, S) = (1 + 19*t/(81*S))^(-0.5)
```

**FSRS v5/v6 (generalized power law):**
```
R(t, S) = (1 + factor * t/S)^(-w_20)
```
where factor is computed so that R(S, S) = 0.9 (by definition of stability).

#### Initial Stability
```
S_0(G) = w_{G-1}    (G = 1..4 for Again/Hard/Good/Easy)
```
Four separate learned parameters for each first-time grade.

#### Initial Difficulty
```
D_0(G) = w_4 - e^(w_5 * (G-1)) + 1     [FSRS v5]
D_0(G) = w_4 - (G-3) * w_5              [FSRS v4]
```
Clamped to [1, 10].

#### Difficulty Update
```
Delta_D(G) = -w_6 * (G - 3)
D' = D + Delta_D * (10 - D) / 9          // linear damping
D'' = w_7 * D_0(4) + (1 - w_7) * D'      // mean reversion
```

#### Stability After Successful Review
```
S'_r(D, S, R, G) = S * (e^w_8 * (11-D) * S^(-w_9) * (e^(w_10*(1-R)) - 1) * hard_or_easy_bonus + 1)
```

where:
- hard_or_easy_bonus = w_15 if Hard, w_16 if Easy, 1 otherwise
- The term (11-D) means easier items gain more stability
- S^(-w_9) means low-stability items gain more (diminishing returns)
- (e^(w_10*(1-R)) - 1) means reviewing at lower R gives bigger boost

#### Stability After Lapse (Forgetting)
```
S'_f(D, S, R) = w_11 * D^(-w_12) * ((S+1)^w_13 - 1) * e^(w_14*(1-R))
```

This resets stability to a low value but not to zero. Higher prior stability partially protects against complete reset.

#### Same-Day Review Stability
```
S'(S, G) = S * e^(w_17*(G-3+w_18)) * S^(-w_19)     [FSRS v5]
```

#### Interval Calculation
```
I(R_target, S) = (S / factor) * (R_target^(-1/w_20) - 1)     [FSRS v5/v6]
I(R_target, S) = 9*S * (1/R_target - 1)                       [FSRS v4]
```

#### Parameter Count by Version
| Version | Parameters | Notes |
|---|---|---|
| v1 | 7 | Basic |
| v2 | 14 | |
| v3 | 13 | Exponential forgetting curve |
| v4 | 17 | Power-law forgetting |
| v4.5 | 17 | Tuned exponent |
| v5 | 19 | Generalized |
| v6 | 21 | w_20 optimizable, w_21 added |

### 5.4 Duolingo Half-Life Regression (HLR)

**Core model:**
```
p_recall = 2^(-delta / h)
```
where:
- delta = time since last practice (lag)
- h = half-life of the memory

**Half-life as a function of features:**
```
h_theta = 2^(theta . x)
```
where:
- theta = learned weight vector
- x = feature vector

**Feature vector x includes:**
- Number of previous practices for this word
- Number of times correct
- Number of times incorrect
- Time since last practice (lag)
- Lexeme tag features (word properties)

**Training objective (loss function):**
```
L(theta) = SUM_i [ (p_i - p_hat_i)^2 + alpha * (h_i - h_hat_i)^2 ] + lambda * ||theta||^2
```

where:
- p_i = observed recall rate (0 or 1 for individual observations, or aggregate)
- p_hat_i = 2^(-delta_i / h_hat_i) = predicted recall probability
- h_i = estimated true half-life from data
- h_hat_i = 2^(theta . x_i) = predicted half-life
- alpha = weight balancing the two loss terms
- lambda = L2 regularization coefficient

**Result**: 12% improvement in daily engagement when deployed at Duolingo.

### 5.5 Leitner System (Mathematical Model)

Cards in boxes 1 through N. Box k has review interval I_k:

```
I_k = I_1 * r^(k-1)
```

where r is the interval multiplier (typically 2).

**Standard Leitner**: r=2, so:
```
Box 1: every 1 day
Box 2: every 2 days
Box 3: every 4 days
Box 4: every 8 days
Box 5: every 16 days
```

**On correct**: Move card to box min(k+1, N).
**On incorrect**: Move card back to box 1.

**Expected steady-state distribution** (assuming constant error rate e per review):
```
P(card in box k) = (1-e)^(k-1) * e / (1 - (1-e)^N)    for k < N
P(card in box N) = (1-e)^(N-1) / (1 - (1-e)^N)         for k = N
```

### 5.6 Algorithm Comparison for Children

| Algorithm | Complexity | Good for Kids? | Why |
|---|---|---|---|
| Leitner | Very simple | **Best** | Concrete (box metaphor), predictable |
| SM-2 | Simple | Good | But EF concept is abstract |
| HLR | Medium | Good | Invisible to user, data-driven |
| FSRS | Complex | Overkill | Too many parameters for small data |

**Recommendation for a kids coding platform**: Start with Leitner (5 boxes). Graduate to SM-2 or simplified FSRS when you have > 1000 reviews per student.

---

## 6. Mastery Learning Models

### 6.1 Bloom's 2 Sigma Problem (1984)

**Finding**: 1-on-1 tutoring with mastery learning produces results **2 standard deviations** above conventional instruction.

```
Effect size of tutoring + mastery learning: d = 2.0 sigma
Effect size of mastery learning alone: d = 1.0 sigma
```

This means the average tutored student outperforms 98% of conventionally taught students.

**Mastery threshold**: Typically set at 80-90% on a formative assessment before advancing.

### 6.2 Power Law of Practice

The time T to perform a task after N practice trials:

```
T(N) = a * N^(-b) + c
```

where:
- a = initial performance level
- b = learning rate (typically 0.2-0.6)
- c = asymptotic minimum time

**Log-log plot is linear**: log(T-c) = log(a) - b * log(N)

This is one of the most robust findings in cognitive science. It applies to:
- Time to complete a coding exercise
- Error rate per exercise
- Time to debug

### 6.3 Mastery Detection from Performance Data

**Simple threshold:**
```
Mastery = (rolling_average of last K attempts >= threshold)
```
Typical: K=3, threshold=0.9 (3 correct out of last 3-4 attempts).

**BKT-based mastery:**
```
Mastery declared when P(L_t) >= 0.95
```

**Bayesian mastery with confidence:**
```
Mastery declared when P(L_t) >= 0.95 AND SE(P(L_t)) < 0.05
```

**Consecutive success criterion** (simplest, good for children):
```
Mastery = (N consecutive correct answers with N >= 3)
```

### 6.4 Optimal Mastery Threshold

The threshold depends on the **cost of moving on too early** vs **cost of over-practicing**:

```
Optimal threshold = P* that minimizes:
  C_error * P(not mastered | declared mastered) + C_time * Expected(extra practice if threshold too high)
```

For a **prerequisite concept** (e.g., variables before loops): Set threshold HIGH (0.95).
For an **optional enrichment** concept: Set threshold LOWER (0.80).
For **review/reinforcement**: Any threshold + spaced repetition handles residual.

### 6.5 Knowledge Spaces (Doignon & Falmagne, 1985)

**Definitions:**

Let Q = {q_1, ..., q_n} be a set of problems/concepts.

A **knowledge state** K is a subset of Q (the concepts a student has mastered).

A **knowledge space** (Q, K) is a collection K of knowledge states such that:
- Empty set is in K (student knows nothing)
- Q is in K (student knows everything)
- K is closed under union: if K1, K2 in K, then K1 UNION K2 in K

A **learning space** additionally satisfies:
- For any two states K1 SUBSET K2, there exists a chain K1 = S0 SUBSET S1 SUBSET ... SUBSET Sm = K2 where each S_{i+1} = S_i UNION {q} for some single concept q.

**Surmise relation** (prerequisite): q SURMISES r means "mastering q implies having mastered r."

This forms a partial order, representable as a DAG.

**Outer fringe** of state K: concepts the student is ready to learn next:
```
OuterFringe(K) = {q not in K : K UNION {q} is in K}
```

This directly gives the set of "next available lessons."

---

## 7. Multi-Armed Bandits for Exercise Selection

### 7.1 Problem Formulation

Each exercise type is an **arm**. Pulling an arm (assigning an exercise) yields a **reward** (learning gain, engagement, completion).

The goal: Maximize cumulative reward over time while learning which arms are best.

### 7.2 Thompson Sampling

**Setup**: For each arm i, maintain a Beta distribution over its success probability:

```
theta_i ~ Beta(alpha_i, beta_i)
```

**Algorithm:**
```
For each round t:
  1. For each arm i, sample: theta_i ~ Beta(alpha_i, beta_i)
  2. Select arm: i* = argmax_i theta_i
  3. Observe reward r_t in {0, 1}
  4. Update:
     If r_t = 1: alpha_{i*} += 1
     If r_t = 0: beta_{i*} += 1
```

**Initialization**: alpha_i = 1, beta_i = 1 (uniform prior).

**Regret bound**: O(sqrt(K * T * log(T))) where K = number of arms, T = number of rounds.

### 7.3 UCB1 (Upper Confidence Bound)

```
For each round t:
  1. Compute UCB for each arm i:
     UCB_i = x_bar_i + sqrt(2 * ln(t) / n_i)
     where x_bar_i = empirical mean reward, n_i = times arm i was pulled
  2. Select arm: i* = argmax_i UCB_i
  3. Observe and update statistics
```

**Regret bound**: O(sqrt(K * T * log(T)))

### 7.4 Contextual Bandits (LinUCB)

Student features (context) influence reward. The expected reward of arm i for context x:

```
E[r | x, arm_i] = theta_i^T * x
```

**LinUCB algorithm:**
```
For each round t with context x_t:
  1. For each arm i:
     theta_hat_i = A_i^(-1) * b_i          // ridge regression estimate
     UCB_i = theta_hat_i^T * x_t + alpha * sqrt(x_t^T * A_i^(-1) * x_t)
  2. Select arm: i* = argmax_i UCB_i
  3. Observe reward r_t
  4. Update:
     A_{i*} += x_t * x_t^T
     b_{i*} += r_t * x_t
```

where:
- A_i = I_d + SUM (x * x^T) for all rounds arm i was chosen (d x d matrix)
- b_i = SUM (r * x) for all rounds arm i was chosen
- alpha = exploration parameter (typically 1 + sqrt(ln(2/delta)/2))

**Context features for education:**
- Student ability estimate (from IRT or BKT)
- Time of day, day of week
- Streak length
- Time since last session
- Number of attempts on current topic
- Recent error rate

### 7.5 Reward Definition for Education

The reward should capture both **learning** and **engagement**:

```
r = w_1 * learning_signal + w_2 * engagement_signal
```

Where:
- learning_signal = P(L_{t+1}) - P(L_t) (BKT knowledge gain)
- engagement_signal = 1 if student continues, 0 if student quits

Or more concretely:
```
r = w_1 * I(correct AND was_challenging) + w_2 * I(continued_to_next)
```

An exercise that is too easy (always correct) or too hard (always wrong) yields low reward.

### 7.6 Implementation Complexity

| Algorithm | Per-round | Storage | Edge Function? |
|---|---|---|---|
| Thompson Sampling | O(K) samples | O(K) | **Yes** |
| UCB1 | O(K) | O(K) | **Yes** |
| LinUCB | O(K * d^2) for matrix inverse | O(K * d^2) | Yes if d < 50 |

**Thompson Sampling is the best choice**: Simple, Bayesian, handles non-stationarity well, and is easy to implement.

---

## 8. Graph Theory for Curriculum

### 8.1 Knowledge Graph as DAG

Model the curriculum as a DAG G = (V, E) where:
- V = set of concepts/skills
- E = prerequisite edges: (u, v) means "u must be learned before v"

**Example (simplified coding curriculum):**
```
variables -> expressions -> conditionals -> loops -> functions -> recursion
variables -> data_types -> arrays -> loops
conditionals -> error_handling
functions -> closures -> higher_order_functions
arrays -> objects -> classes -> inheritance
```

### 8.2 Topological Sort for Prerequisite Ordering

Any valid teaching order is a **topological sort** of the DAG:

```
ALGORITHM: Kahn's Topological Sort
  1. Compute in-degree for all vertices
  2. Queue = all vertices with in-degree 0
  3. While Queue not empty:
     a. Remove vertex u from Queue
     b. Output u
     c. For each neighbor v of u:
        in_degree[v] -= 1
        If in_degree[v] == 0: add v to Queue
  4. If output length < |V|: cycle detected (error in curriculum)
```

Time: O(V + E). Trivially runs in Edge Function.

### 8.3 Critical Path (Longest Path in DAG)

The **minimum number of sequential lessons** required, regardless of parallelism:

```
ALGORITHM: Longest Path in DAG
  1. Topological sort: u_1, u_2, ..., u_n
  2. dist[u_1] = 0 (or 1 if counting vertices)
  3. For each vertex u in topological order:
     For each edge (u, v):
       dist[v] = max(dist[v], dist[u] + weight(u,v))
  4. Critical path length = max(dist[v] for all v)
```

**Application**: This gives the fastest possible time to complete the curriculum, assuming unlimited daily capacity.

### 8.4 Shortest Path to Mastery

Given a student's current knowledge state K (set of mastered concepts) and a target concept g:

```
ALGORITHM: Shortest Learning Path
  1. Compute: needed = all ancestors of g in DAG that are NOT in K
  2. Topological sort "needed"
  3. Return sorted list (this is the minimal learning path)
```

For finding ancestors:
```
Ancestors(g) = {v : there exists a path from v to g in G}
```

Computed via reverse BFS/DFS from g. Time: O(V + E).

### 8.5 "Next Available Concepts"

Given knowledge state K:
```
NextAvailable(K) = {v not in K : all predecessors of v are in K}
```

This is exactly the **outer fringe** from Knowledge Space Theory (Section 6.5).

```
ALGORITHM: Next Available
  For each concept v not in K:
    If all parents of v in DAG are in K:
      Add v to result
```

Time: O(V * max_in_degree). Very fast for Edge Functions.

### 8.6 Adaptive Path Optimization

Combine graph structure with student model:

```
ALGORITHM: Personalized Learning Path
  1. Compute NextAvailable(K) = candidate concepts
  2. For each candidate c:
     a. Estimate difficulty for THIS student: d_c = IRT_difficulty(c, theta_student)
     b. Estimate engagement reward: r_c = bandit_UCB(c, student_context)
     c. Compute "value" of learning c:
        value_c = importance(c) * readiness(c) * engagement(c)
     where:
       importance(c) = number of descendants of c (how much it unlocks)
       readiness(c) = 1 - d_c (how ready the student is)
       engagement(c) = r_c (predicted engagement)
  3. Select concept c* = argmax_c value_c
```

---

## 9. Markov Decision Processes for Teaching

### 9.1 MDP Formulation

Teaching as an MDP M = (S, A, T, R, gamma):

- **S** (States): Student knowledge states. Can be:
  - Binary vector over K concepts: s in {0,1}^K (2^K states)
  - BKT probability vector: s in [0,1]^K (continuous)
  - Discretized: bin each P(L_k) into {low, medium, high} -> 3^K states

- **A** (Actions): Teaching actions:
  - Teach concept k
  - Review concept k
  - Give quiz on concept k
  - Provide hint
  - Increase/decrease difficulty
  - Take a break

- **T** (Transition): P(s' | s, a) — probability of reaching state s' given current state s and action a:
  - If action = "teach concept k" and prereqs are met:
    P(L_k increases) = learning_rate(k, student_state)
  - If action = "review concept k":
    P(L_k stays high) = 1 - forgetting_rate * time_since_last

- **R** (Reward): R(s, a, s') — immediate reward:
  ```
  R = w_mastery * (concepts mastered in s' - concepts mastered in s)
      + w_engage * (student engagement score)
      - w_time * (time spent on action a)
      - w_frustration * (frustration indicator)
  ```

- **gamma** (Discount): 0.9-0.99 (values future mastery but not infinitely)

### 9.2 POMDP Extension

In practice, the teacher **cannot directly observe** the student's knowledge state. POMDP adds:

- **Omega** (Observations): What the teacher can see:
  - Correct/incorrect on exercises
  - Time to complete
  - Number of attempts
  - Hint requests

- **O** (Observation function): P(o | s', a) — probability of observation o given state s' and action a:
  ```
  P(correct | L, no_hint) = 1 - P(S)     // slip
  P(correct | ~L, no_hint) = P(G)         // guess
  P(correct | L, with_hint) = 1 - P(S)/2  // hint helps even if known
  P(correct | ~L, with_hint) = P(G) * 2   // hint helps more if not known
  ```

- **b** (Belief state): Distribution over states, updated via Bayes' rule:
  ```
  b'(s') = eta * O(o|s',a) * SUM_s T(s'|s,a) * b(s)
  ```
  where eta is a normalizing constant.

### 9.3 Solving the MDP

**Value Iteration** (for small state spaces):
```
V_{k+1}(s) = max_a [R(s,a) + gamma * SUM_{s'} T(s'|s,a) * V_k(s')]

Policy: pi(s) = argmax_a [R(s,a) + gamma * SUM_{s'} T(s'|s,a) * V(s')]
```

Converges when max_s |V_{k+1}(s) - V_k(s)| < epsilon.

**Complexity**: O(|S|^2 * |A|) per iteration. With K=20 concepts and binary states, |S| = 2^20 ~ 1M — too large!

**Practical solution for education**: Use **factored MDPs** or **approximate methods**:
- Treat each concept independently (reduces to K separate 2-state MDPs)
- Use linear function approximation: V(s) = w^T * phi(s)
- Use deep RL (DQN/policy gradient) for complex state spaces

### 9.4 Practical Simplification

Instead of full MDP/POMDP, use a **rule-based policy** informed by the MDP structure:

```
ALGORITHM: Heuristic Teaching Policy
  1. Update belief state using BKT
  2. For each concept k, compute:
     - mastery: P(L_k)
     - urgency: importance(k) * (1 - P(L_k))
     - readiness: min(P(L_prereq) for prereq of k)
     - freshness: time_since_last_review(k)
  3. Decision rules:
     IF any concept has P(L_k) > 0.95 AND freshness > forgetting_threshold:
       ACTION = review(k)  // spaced repetition
     ELIF any concept has readiness > 0.9 AND urgency is highest:
       ACTION = teach(k)   // new material
     ELIF student_engagement < threshold:
       ACTION = fun_exercise() or break()
     ELSE:
       ACTION = practice(k where P(L_k) is closest to 0.7)  // zone of proximal development
```

### 9.5 Implementation Complexity

| Approach | Complexity | Edge Function? |
|---|---|---|
| Full POMDP solve | Exponential in |S| | No |
| Factored MDP (per-concept) | O(K * |A|) | **Yes** |
| Rule-based policy | O(K) | **Yes** |
| Deep RL policy (inference) | O(model_size) | Maybe (small model) |

---

## 10. Practical Algorithm Selection

### 10.1 Recommended Stack for a Coding Academy (100-1000 students)

| Component | Recommended Algorithm | Reason |
|---|---|---|
| **Knowledge tracing** | BKT | Simple, O(1) update, interpretable, works with little data |
| **Difficulty adaptation** | Elo rating | Simpler than IRT, works online, joint student-item estimation |
| **Spaced repetition** | SM-2 or Leitner | Simple to implement, proven, no training data needed |
| **Exercise selection** | Thompson Sampling | Bayesian, handles cold start, O(K) per decision |
| **Curriculum ordering** | DAG topological sort | Deterministic, no ML needed, O(V+E) |
| **Mastery detection** | BKT threshold (P(L) > 0.95) | Direct from knowledge tracing |
| **Offline analytics** | DKT or FSRS | Run weekly to improve parameters |

### 10.2 Elo Rating for Education (Detailed)

Since this is the recommended difficulty adaptation approach:

**Expected probability** of student j answering item i correctly:
```
E_ij = 1 / (1 + 10^((b_i - theta_j) / 400))
```

where theta_j = student rating, b_i = item difficulty rating.

**After observing response x_ij in {0, 1}:**

Update student rating:
```
theta_j' = theta_j + K_s * (x_ij - E_ij)
```

Update item difficulty:
```
b_i' = b_i + K_i * (E_ij - x_ij)
```

Note: student and item update in **opposite directions**!

**K-factor (learning rate):**
- K_s = 0.4 to 4.0 for students (higher for new students, lower for established)
- K_i = 0.1 to 1.0 for items (lower since items are more stable)

**Adaptive K-factor:**
```
K_s = K_max / (1 + c * n_interactions)
```
where n_interactions = number of previous responses.

**Advantages over IRT:**
- No need for offline calibration
- Works with a single response (real-time)
- Easy to implement (2 lines of code per update)
- Comparable accuracy for adaptive item selection

### 10.3 Minimum Data Requirements

| Algorithm | Cold Start | Personalization Threshold | Full Model |
|---|---|---|---|
| BKT | Works with prior (no data) | ~10 responses per KC | ~50 per KC |
| Elo | Default rating (no data) | ~5 responses | ~30 responses |
| IRT (per-item) | Requires calibration set | N/A (item-level) | ~200 students per item |
| SM-2 | Works immediately | Improves after ~5 reviews | Stable after ~20 |
| FSRS | Needs ~100 reviews to optimize | ~300 reviews | ~1000 reviews |
| Thompson Sampling | Uniform prior (no data) | ~10 pulls per arm | ~50 per arm |
| DKT | Needs training data | N/A | ~10,000 interaction sequences |

### 10.4 Cold Start Strategy

For a **new student** with no data:

```
1. Placement quiz (5-10 questions):
   - Use CAT with item bank covering key prerequisite concepts
   - After 5 questions, have rough theta estimate (SE ~ 0.5)
   - Map theta to initial BKT states for each KC

2. Initial settings:
   - BKT: P(L_0) = logistic(theta - difficulty_of_KC) for each KC
   - Elo: theta_student = 1200 + 400 * theta_IRT
   - SM-2: EF = 2.5 (default)
   - Thompson Sampling: alpha=1, beta=1 (uniform prior)

3. Rapid adaptation (first 10 interactions):
   - Use higher K-factor in Elo (K=4.0)
   - Use more aggressive BKT P(T) for faster convergence
   - After 10 interactions, reduce to normal learning rates
```

For a **new exercise/item** with no data:

```
1. Expert estimation: Set initial difficulty based on:
   - Number of prerequisite concepts
   - Kolmogorov complexity proxy (concept count)
   - Bloom's taxonomy level

2. Initial Elo rating: b_item = 1200 (medium difficulty)

3. High K-factor for items: K_i = 1.0 initially, decay to 0.1 after 50 responses

4. Use Thompson Sampling with informative prior:
   - alpha = estimated_success_rate * 5
   - beta = (1 - estimated_success_rate) * 5
   (weak prior equivalent to 5 observations)
```

### 10.5 Complete System Architecture

```
+-------------------+     +-------------------+     +-------------------+
|   REAL-TIME LAYER |     |   BATCH LAYER     |     |   DATA LAYER      |
|   (Edge Function) |     |   (Scheduled Job)  |     |   (Supabase)      |
+-------------------+     +-------------------+     +-------------------+
|                   |     |                   |     |                   |
| BKT Update        |<--->| FSRS Optimization |<--->| student_states    |
|   P(L) per KC     |     |   Fit w0..w20     |     |   (P(L) per KC)   |
|                   |     |                   |     |                   |
| Elo Update        |<--->| IRT Calibration   |<--->| item_params       |
|   theta, b        |     |   Fit a, b, c     |     |   (difficulty, etc)|
|                   |     |                   |     |                   |
| Thompson Sampling |<--->| DKT Training      |<--->| interactions      |
|   Next exercise   |     |   Offline model   |     |   (full history)  |
|                   |     |                   |     |                   |
| Mastery Check     |     | Analytics         |<--->| learning_curves   |
|   P(L) > 0.95?   |     |   Reports, viz    |     |   (aggregated)    |
|                   |     |                   |     |                   |
| DAG NextAvailable |     |                   |     | curriculum_graph  |
|   Ready concepts  |     |                   |     |   (DAG edges)     |
+-------------------+     +-------------------+     +-------------------+
```

### 10.6 Edge Function Pseudocode (Complete)

```typescript
// === COMPLETE LEARNING ENGINE (runs in Supabase Edge Function) ===

interface StudentState {
  knowledge: Map<string, number>;   // KC -> P(L)
  elo_rating: number;               // student skill rating
  bandits: Map<string, {alpha: number, beta: number}>;  // per-exercise
  sm2: Map<string, {ef: number, interval: number, repetition: number, next_review: Date}>;
}

// --- BKT UPDATE ---
function bktUpdate(pL: number, correct: boolean, pG: number, pS: number, pT: number): number {
  const pCorrect = pL * (1 - pS) + (1 - pL) * pG;
  const pLGivenObs = correct
    ? (pL * (1 - pS)) / pCorrect
    : (pL * pS) / (1 - pCorrect);
  return pLGivenObs + (1 - pLGivenObs) * pT;
}

// --- ELO UPDATE ---
function eloUpdate(
  studentRating: number, itemDifficulty: number, correct: boolean,
  kStudent: number = 1.0, kItem: number = 0.3
): {newStudentRating: number, newItemDifficulty: number} {
  const expected = 1 / (1 + Math.pow(10, (itemDifficulty - studentRating) / 400));
  const outcome = correct ? 1 : 0;
  return {
    newStudentRating: studentRating + kStudent * (outcome - expected),
    newItemDifficulty: itemDifficulty + kItem * (expected - outcome)
  };
}

// --- THOMPSON SAMPLING ---
function selectExercise(
  candidates: string[],
  bandits: Map<string, {alpha: number, beta: number}>
): string {
  let bestArm = candidates[0];
  let bestSample = -1;
  for (const arm of candidates) {
    const {alpha, beta} = bandits.get(arm) ?? {alpha: 1, beta: 1};
    const sample = betaSample(alpha, beta);  // sample from Beta distribution
    if (sample > bestSample) {
      bestSample = sample;
      bestArm = arm;
    }
  }
  return bestArm;
}

// --- SM-2 SPACED REPETITION ---
function sm2Update(
  ef: number, interval: number, repetition: number, quality: number
): {ef: number, interval: number, repetition: number} {
  let newEf = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEf = Math.max(1.3, newEf);

  if (quality >= 3) {
    let newInterval: number;
    if (repetition === 0) newInterval = 1;
    else if (repetition === 1) newInterval = 6;
    else newInterval = Math.round(interval * newEf);
    return {ef: newEf, interval: newInterval, repetition: repetition + 1};
  } else {
    return {ef: newEf, interval: 1, repetition: 0};
  }
}

// --- MASTERY CHECK ---
function isMastered(pL: number, threshold: number = 0.95): boolean {
  return pL >= threshold;
}

// --- NEXT AVAILABLE CONCEPTS (DAG) ---
function nextAvailable(
  mastered: Set<string>,
  prerequisites: Map<string, string[]>  // concept -> list of prereqs
): string[] {
  const result: string[] = [];
  for (const [concept, prereqs] of prerequisites) {
    if (!mastered.has(concept) && prereqs.every(p => mastered.has(p))) {
      result.push(concept);
    }
  }
  return result;
}

// --- MAIN DECISION ENGINE ---
function decideNextAction(state: StudentState, curriculum: DAG): Action {
  const mastered = new Set(
    [...state.knowledge.entries()].filter(([_, pL]) => pL >= 0.95).map(([kc, _]) => kc)
  );

  // 1. Check for due reviews (spaced repetition)
  const dueReviews = [...state.sm2.entries()]
    .filter(([_, data]) => data.next_review <= new Date())
    .sort((a, b) => a[1].next_review.getTime() - b[1].next_review.getTime());

  if (dueReviews.length > 0) {
    return {type: 'review', concept: dueReviews[0][0]};
  }

  // 2. Find next available concepts
  const available = nextAvailable(mastered, curriculum.prerequisites);

  if (available.length === 0) {
    return {type: 'complete', message: 'All concepts mastered!'};
  }

  // 3. Use Thompson Sampling to select among available concepts
  const selected = selectExercise(available, state.bandits);

  return {type: 'teach', concept: selected};
}
```

**Total Edge Function size**: ~200 lines of TypeScript. Runs in < 50ms. No ML libraries needed.

---

## Appendix A: Key Mathematical Constants

| Constant | Value | Context |
|---|---|---|
| Default EF (SM-2) | 2.5 | Initial easiness factor |
| Default Elo | 1200 | Initial rating for students/items |
| Elo K-factor range | 0.1 - 4.0 | Learning rate |
| BKT mastery threshold | 0.95 | P(L) for mastery |
| FSRS target retention | 0.90 | Desired recall probability |
| Optimal question difficulty | P(correct) ~ 0.5-0.7 | Maximum information zone |
| Bloom's 2 sigma | d = 2.0 | Effect size of 1-on-1 tutoring |
| Power law exponent | b ~ 0.2-0.6 | Learning curve slope |

## Appendix B: Which Algorithm When?

```
IF (you have < 100 students AND < 10 exercises per KC):
  USE: BKT + SM-2 + DAG
  REASON: Minimal data, maximum simplicity

ELIF (you have 100-1000 students AND 10-50 exercises per KC):
  USE: BKT + Elo + Thompson Sampling + SM-2 + DAG
  REASON: Enough data for Elo, bandits add personalization

ELIF (you have > 1000 students AND > 50 exercises per KC):
  USE: BKT (real-time) + DKT (offline) + FSRS + IRT + DAG
  REASON: Enough data for neural models and full IRT calibration

IF (target audience is children < 12):
  PREFER: Leitner over SM-2, simpler mastery rules (3 consecutive correct)
  AVOID: Complex invisible algorithms (children need visible progress)

IF (platform is coding-specific):
  ADD: Code quality metrics to reward signal
  ADD: Time-to-solution as observation in POMDP
  ADD: Test case pass rate as partial credit in BKT (not just binary)
```

## Appendix C: Sources and References

### Foundational Papers
- Shannon, C.E. (1948). "A Mathematical Theory of Communication"
- Corbett, A.T. & Anderson, J.R. (1994). "Knowledge Tracing: Modeling the Acquisition of Procedural Knowledge"
- Bloom, B.S. (1984). "The 2 Sigma Problem: The Search for Methods of Group Instruction as Effective as One-to-One Tutoring"
- Doignon, J.P. & Falmagne, J.C. (1985). "Spaces for the Assessment of Knowledge"
- Rasch, G. (1960). "Probabilistic Models for Some Intelligence and Attainment Tests"

### Spaced Repetition
- Wozniak, P.A. (1990). "Application of a computer to improve the results obtained in working with the SuperMemo method" (SM-2)
- Settles, B. & Meeder, B. (2016). "A Trainable Spaced Repetition Model for Language Learning" (HLR/Duolingo)
- Ye, J. (2024). "FSRS: A Modern Spaced Repetition Algorithm"

### Deep Knowledge Tracing
- Piech, C. et al. (2015). "Deep Knowledge Tracing" (DKT with LSTM)
- Pandey, S. & Karypis, G. (2019). "A Self-Attentive Model for Knowledge Tracing" (SAKT)
- Ghosh, A. et al. (2020). "Context-Aware Attentive Knowledge Tracing" (AKT)
