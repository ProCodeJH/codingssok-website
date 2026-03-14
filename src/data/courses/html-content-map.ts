/**
 * C언어 & 컴퓨터기초 HTML 교재 파일 매핑
 * 각 유닛에 대응하는 HTML 교재 파일 경로를 반환
 *
 * 컴퓨터 기초 (courseId=8): part0-u01 ~ part0-u44
 * C언어 v1 (courseId=4, 레거시): part1-u01 ~ part7-u18
 * C언어 v2 (courseId=4, 신규): L0-L16, 총 247유닛
 */

// part0: 컴퓨터 기초 유닛 파일명 (v2 버전)
const PART0_FILES: Record<number, string> = {
  1:'part0-u01-computer-intro-v2.html',2:'part0-u02-hardware-v2.html',3:'part0-u03-bits-v2.html',
  4:'part0-u04-binary-decimal-v2.html',5:'part0-u05-octal-hex-v2.html',6:'part0-u06-ascii-v2.html',
  7:'part0-u07-files-folders-v2.html',8:'part0-u08-terminal-v2.html',9:'part0-u09-true-false-v2.html',
  10:'part0-u10-and-v2.html',11:'part0-u11-or-v2.html',12:'part0-u12-not-v2.html',
  13:'part0-u13-logic-combo-v2.html',14:'part0-u14-comparison-v2.html',15:'part0-u15-logic-puzzle-v2.html',
  16:'part0-u16-variable-v2.html',17:'part0-u17-division-remainder-v2.html',18:'part0-u18-pattern-generalize-v2.html',
  19:'part0-u19-coordinates-v2.html',20:'part0-u20-counting-cases-v2.html',21:'part0-u21-prime-v2.html',
  22:'part0-u22-gcd-lcm-v2.html',23:'part0-u23-decomposition-v2.html',24:'part0-u24-pattern-recognition-v2.html',
  25:'part0-u25-abstraction-v2.html',26:'part0-u26-algorithm-design-v2.html',27:'part0-u27-flowchart-v2.html',
  28:'part0-u28-pseudocode-v2.html',29:'part0-u29-brute-force-v2.html',30:'part0-u30-greedy-v2.html',
  31:'part0-u31-simulation-v2.html',32:'part0-u32-sets-v2.html',33:'part0-u33-permutation-combination-v2.html',
  34:'part0-u34-recursion-v2.html',35:'part0-u35-graph-v2.html',36:'part0-u36-stack-queue-v2.html',
  37:'part0-u37-programming-language-v2.html',38:'part0-u38-why-c-v2.html',39:'part0-u39-setup-v2.html',
  40:'part0-u40-c-skeleton-v2.html',41:'part0-u41-compile-v2.html',42:'part0-u42-comments-indent-v2.html',
  43:'part0-u43-flowchart-project-v2.html',44:'part0-u44-comprehensive-quiz-v2.html',
};

// C언어 v2: unitIndex(1-based) -> 파일명 (L0~L16, 247유닛)
const C_LANG_V2_FILES: Record<number, string> = {
  1:'L0-u01-computer-is-dumb-v2.html',2:'L0-u02-binary-v2.html',3:'L0-u03-input-process-output-v2.html',
  4:'L0-u04-algorithm-recipe-v2.html',5:'L0-u05-flowchart-v2.html',6:'L0-u06-pseudocode-v2.html',
  7:'L0-u07-decomposition-v2.html',8:'L0-u08-pattern-recognition-v2.html',9:'L0-u09-abstraction-v2.html',
  10:'L0-u10-daily-flowchart-project-v2.html',
  11:'L1-u01-c-intro-v2.html',12:'L1-u02-dev-setup-v2.html',13:'L1-u03-hello-world-v2.html',
  14:'L1-u04-c-skeleton-v2.html',15:'L1-u05-self-intro-project-v2.html',16:'L1-u06-semicolon-braces-v2.html',
  17:'L1-u07-comments-v2.html',18:'L1-u08-indentation-style-v2.html',19:'L1-u09-compile-errors-v2.html',
  20:'L1-u10-runtime-errors-v2.html',21:'L1-u11-error-hunter-project-v2.html',22:'L1-u12-printf-multiline-v2.html',
  23:'L1-u13-escape-sequences-v2.html',24:'L1-u14-star-rect-triangle-v2.html',25:'L1-u15-star-heart-diamond-v2.html',
  26:'L1-u16-card-ascii-project-v2.html',
  27:'L2-u01-variables-v2.html',28:'L2-u02-naming-rules-v2.html',29:'L2-u03-int-type-v2.html',
  30:'L2-u04-format-specifiers-v2.html',31:'L2-u05-age-calculator-project-v2.html',32:'L2-u06-scanf-v2.html',
  33:'L2-u07-arithmetic-v2.html',34:'L2-u08-modulo-v2.html',35:'L2-u09-float-double-v2.html',
  36:'L2-u10-unit-converter-project-v2.html',37:'L2-u11-char-ascii-v2.html',38:'L2-u12-data-types-summary-v2.html',
  39:'L2-u13-sizeof-v2.html',40:'L2-u14-type-casting-v2.html',41:'L2-u15-bmi-calculator-project-v2.html',
  42:'L2-u16-const-define-v2.html',43:'L2-u17-compound-assignment-v2.html',44:'L2-u18-increment-decrement-v2.html',
  45:'L2-u19-operator-precedence-v2.html',46:'L2-u20-calculator-project-v2.html',
  47:'L3-u01-if-basic-v2.html',48:'L3-u02-if-else-v2.html',49:'L3-u03-else-if-v2.html',
  50:'L3-u04-number-quiz-project-v2.html',51:'L3-u05-comparison-operators-v2.html',52:'L3-u06-logical-operators-v2.html',
  53:'L3-u07-nested-if-v2.html',54:'L3-u08-grade-calculator-project-v2.html',55:'L3-u09-switch-case-v2.html',
  56:'L3-u10-switch-advanced-v2.html',57:'L3-u11-ternary-operator-v2.html',58:'L3-u12-conditional-debugging-v2.html',
  59:'L3-u13-conditional-patterns-v2.html',60:'L3-u14-vending-machine-project-v2.html',
  61:'L4-u01-why-loops-v2.html',62:'L4-u02-while-basic-v2.html',63:'L4-u03-while-counter-sum-v2.html',
  64:'L4-u04-countdown-timer-project-v2.html',65:'L4-u05-for-basic-v2.html',66:'L4-u06-for-applications-v2.html',
  67:'L4-u07-for-star-patterns-v2.html',68:'L4-u08-multiplication-table-project-v2.html',69:'L4-u09-do-while-v2.html',
  70:'L4-u10-break-continue-v2.html',71:'L4-u11-nested-loops-v2.html',72:'L4-u12-star-advanced-project-v2.html',
  73:'L4-u13-max-min-v2.html',74:'L4-u14-fizzbuzz-v2.html',75:'L4-u15-loop-debugging-v2.html',
  76:'L4-u16-number-baseball-project-v2.html',77:'L4-u17-loop-patterns-v2.html',78:'L4-u18-menu-program-project-v2.html',
  79:'L5-u01-divisors-multiples-v2.html',80:'L5-u02-prime-numbers-v2.html',81:'L5-u03-gcd-lcm-v2.html',
  82:'L5-u04-prime-explorer-project-v2.html',83:'L5-u05-factorial-combination-v2.html',84:'L5-u06-fibonacci-v2.html',
  85:'L5-u07-power-log-v2.html',86:'L5-u08-math-quiz-project-v2.html',87:'L5-u09-base-conversion-v2.html',
  88:'L5-u10-recursion-basic-v2.html',89:'L5-u11-recursion-hanoi-v2.html',90:'L5-u12-converter-calculator-project-v2.html',
  91:'L6-u01-array-intro-v2.html',92:'L6-u02-array-declare-init-v2.html',93:'L6-u03-array-loop-v2.html',
  94:'L6-u04-grade-calculator-project-v2.html',95:'L6-u05-linear-search-v2.html',96:'L6-u06-bubble-sort-v2.html',
  97:'L6-u07-array-copy-reverse-rotate-v2.html',98:'L6-u08-lotto-project-v2.html',99:'L6-u09-2d-array-v2.html',
  100:'L6-u10-2d-array-applications-v2.html',101:'L6-u11-seating-chart-project-v2.html',102:'L6-u12-string-char-array-v2.html',
  103:'L6-u13-string-functions-v2.html',104:'L6-u14-string-input-v2.html',105:'L6-u15-string-advanced-v2.html',
  106:'L6-u16-word-counter-project-v2.html',
  107:'L7-u01-function-intro-v2.html',108:'L7-u02-void-function-v2.html',109:'L7-u03-return-function-v2.html',
  110:'L7-u04-math-toolkit-project-v2.html',111:'L7-u05-parameter-argument-v2.html',112:'L7-u06-scope-v2.html',
  113:'L7-u07-call-by-value-v2.html',114:'L7-u08-function-calculator-project-v2.html',115:'L7-u09-array-to-function-v2.html',
  116:'L7-u10-prototype-header-v2.html',117:'L7-u11-static-v2.html',118:'L7-u12-rps-game-project-v2.html',
  119:'L7-u13-function-patterns-v2.html',120:'L7-u14-text-rpg-project-v2.html',
  121:'L8-u01-memory-address-v2.html',122:'L8-u02-pointer-variable-v2.html',123:'L8-u03-dereference-v2.html',
  124:'L8-u04-swap-project-v2.html',125:'L8-u05-call-by-reference-v2.html',126:'L8-u06-array-pointer-v2.html',
  127:'L8-u07-pointer-arithmetic-v2.html',128:'L8-u08-reverse-sort-project-v2.html',129:'L8-u09-string-pointer-v2.html',
  130:'L8-u10-double-pointer-v2.html',131:'L8-u11-pointer-array-vs-array-pointer-v2.html',132:'L8-u12-string-sort-project-v2.html',
  133:'L8-u13-void-pointer-v2.html',134:'L8-u14-pointer-pitfalls-v2.html',135:'L8-u15-pointer-patterns-v2.html',
  136:'L8-u16-memory-viewer-project-v2.html',
  137:'L9-u01-struct-intro-v2.html',138:'L9-u02-struct-member-v2.html',139:'L9-u03-typedef-v2.html',
  140:'L9-u04-student-id-project-v2.html',141:'L9-u05-struct-array-v2.html',142:'L9-u06-struct-function-v2.html',
  143:'L9-u07-arrow-operator-v2.html',144:'L9-u08-phonebook-project-v2.html',145:'L9-u09-enum-v2.html',
  146:'L9-u10-union-v2.html',147:'L9-u11-nested-self-ref-v2.html',148:'L9-u12-bit-field-v2.html',
  149:'L9-u13-struct-patterns-v2.html',150:'L9-u14-rpg-character-project-v2.html',
  151:'L10-u01-stack-vs-heap-v2.html',152:'L10-u02-malloc-free-v2.html',153:'L10-u03-calloc-realloc-v2.html',
  154:'L10-u04-dynamic-array-project-v2.html',155:'L10-u05-memory-leak-v2.html',156:'L10-u06-define-macro-v2.html',
  157:'L10-u07-conditional-compile-v2.html',158:'L10-u08-include-header-guard-v2.html',159:'L10-u09-configurable-project-v2.html',
  160:'L10-u10-multi-file-v2.html',161:'L10-u11-static-extern-v2.html',162:'L10-u12-makefile-v2.html',
  163:'L10-u13-storage-class-v2.html',164:'L10-u14-modular-calc-project-v2.html',
  165:'L11-u01-what-is-file-v2.html',166:'L11-u02-file-write-v2.html',167:'L11-u03-file-read-v2.html',
  168:'L11-u04-diary-project-v2.html',169:'L11-u05-binary-file-v2.html',170:'L11-u06-fseek-ftell-v2.html',
  171:'L11-u07-file-error-v2.html',172:'L11-u08-grade-file-project-v2.html',173:'L11-u09-csv-file-v2.html',
  174:'L11-u10-argc-argv-v2.html',175:'L11-u11-bitmap-analysis-v2.html',176:'L11-u12-grade-system-project-v2.html',
  177:'L12-u01-why-sorting-v2.html',178:'L12-u02-bubble-sort-v2.html',179:'L12-u03-selection-sort-v2.html',
  180:'L12-u04-sort-race-project-v2.html',181:'L12-u05-insertion-sort-v2.html',182:'L12-u06-quick-sort-v2.html',
  183:'L12-u07-merge-sort-v2.html',184:'L12-u08-qsort-stdlib-v2.html',185:'L12-u09-custom-sort-project-v2.html',
  186:'L12-u10-linear-binary-search-v2.html',187:'L12-u11-big-o-v2.html',188:'L12-u12-counting-sort-v2.html',
  189:'L12-u13-sort-patterns-v2.html',190:'L12-u14-dictionary-project-v2.html',
  191:'L13-u01-stack-v2.html',192:'L13-u02-stack-apps-v2.html',193:'L13-u03-queue-v2.html',
  194:'L13-u04-stack-calc-project-v2.html',195:'L13-u05-deque-v2.html',196:'L13-u06-singly-linked-list-v2.html',
  197:'L13-u07-linked-list-ops-v2.html',198:'L13-u08-todo-list-project-v2.html',199:'L13-u09-doubly-linked-list-v2.html',
  200:'L13-u10-circular-linked-list-v2.html',201:'L13-u11-hash-table-v2.html',202:'L13-u12-phone-hash-project-v2.html',
  203:'L13-u13-binary-tree-v2.html',204:'L13-u14-bst-v2.html',205:'L13-u15-heap-v2.html',
  206:'L13-u16-scheduler-project-v2.html',
  207:'L14-u01-bool-stdbool-v2.html',208:'L14-u02-bitwise-ops-v2.html',209:'L14-u03-shift-ops-v2.html',
  210:'L14-u04-bitmask-project-v2.html',211:'L14-u05-overflow-v2.html',212:'L14-u06-ieee754-v2.html',
  213:'L14-u07-function-pointer-v2.html',214:'L14-u08-callback-v2.html',215:'L14-u09-qsort-compare-project-v2.html',
  216:'L14-u10-variadic-v2.html',217:'L14-u11-goto-v2.html',218:'L14-u12-debugger-v2.html',
  219:'L15-u01-brute-force-v2.html',220:'L15-u02-backtracking-v2.html',221:'L15-u03-greedy-v2.html',
  222:'L15-u04-greedy-project-v2.html',223:'L15-u05-dp-basics-v2.html',224:'L15-u06-dp-fibonacci-v2.html',
  225:'L15-u07-dp-knapsack-v2.html',226:'L15-u08-dp-coin-project-v2.html',227:'L15-u09-graph-representation-v2.html',
  228:'L15-u10-dfs-v2.html',229:'L15-u11-bfs-v2.html',230:'L15-u12-maze-project-v2.html',
  231:'L15-u13-dijkstra-v2.html',232:'L15-u14-floyd-warshall-v2.html',233:'L15-u15-mst-v2.html',
  234:'L15-u16-navigation-project-v2.html',235:'L15-u17-kmp-v2.html',236:'L15-u18-koi-challenge-project-v2.html',
  237:'L16-u01-minesweeper-project-v2.html',238:'L16-u02-mini-db-project-v2.html',239:'L16-u03-file-archiver-project-v2.html',
  240:'L16-u04-json-parser-project-v2.html',241:'L16-u05-text-editor-project-v2.html',242:'L16-u06-coding-style-v2.html',
  243:'L16-u07-stdlib-summary-v2.html',244:'L16-u08-c11-c17-v2.html',245:'L16-u09-next-steps-v2.html',
  246:'L16-u10-final-exam-v2.html',247:'L16-u11-async-in-c-v2.html',
};

/**
 * 코스와 유닛 인덱스(1-based)로 HTML 교재 파일 경로 반환
 * @returns `/learn/C언어/파일명` 또는 null
 */
export function getHtmlContentPath(courseId: string, unitIndex: number): string | null {
  if (courseId === '8') {
    // 컴퓨터 기초: unitIndex 1-based -> part0 파일
    const file = PART0_FILES[unitIndex];
    return file ? `/learn/컴퓨터기초/${file}` : null;
  }
  if (courseId === '4') {
    const file = C_LANG_V2_FILES[unitIndex];
    return file ? `/learn/C언어/${file}` : null;
  }
  return null;
}
