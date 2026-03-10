/**
 * C언어 & 컴퓨터기초 HTML 교재 파일 매핑
 * 각 유닛에 대응하는 HTML 교재 파일 경로를 반환
 * 
 * 컴퓨터 기초 (courseId=8): part0-u01 ~ part0-u44
 * C언어 (courseId=4): part1-u01 ~ part7-u18
 */

// part0: 컴퓨터 기초 유닛 파일명
const PART0_FILES: Record<number, string> = {
  1:'part0-u01-computer-intro-pdf.html',2:'part0-u02-hardware-pdf.html',3:'part0-u03-bits-pdf.html',
  4:'part0-u04-binary-decimal-pdf.html',5:'part0-u05-octal-hex-pdf.html',6:'part0-u06-ascii-pdf.html',
  7:'part0-u07-files-folders-pdf.html',8:'part0-u08-terminal-pdf.html',9:'part0-u09-true-false-pdf.html',
  10:'part0-u10-and-pdf.html',11:'part0-u11-or-pdf.html',12:'part0-u12-not-pdf.html',
  13:'part0-u13-logic-combo-pdf.html',14:'part0-u14-comparison-pdf.html',15:'part0-u15-logic-puzzle-pdf.html',
  16:'part0-u16-variable-pdf.html',17:'part0-u17-division-remainder-pdf.html',18:'part0-u18-pattern-generalize-pdf.html',
  19:'part0-u19-coordinates-pdf.html',20:'part0-u20-counting-cases-pdf.html',21:'part0-u21-prime-pdf.html',
  22:'part0-u22-gcd-lcm-pdf.html',23:'part0-u23-decomposition-pdf.html',24:'part0-u24-pattern-recognition-pdf.html',
  25:'part0-u25-abstraction-pdf.html',26:'part0-u26-algorithm-design-pdf.html',27:'part0-u27-flowchart-pdf.html',
  28:'part0-u28-pseudocode-pdf.html',29:'part0-u29-brute-force-pdf.html',30:'part0-u30-greedy-pdf.html',
  31:'part0-u31-simulation-pdf.html',32:'part0-u32-sets-pdf.html',33:'part0-u33-permutation-combination-pdf.html',
  34:'part0-u34-recursion-pdf.html',35:'part0-u35-graph-pdf.html',36:'part0-u36-stack-queue-pdf.html',
  37:'part0-u37-programming-language-pdf.html',38:'part0-u38-why-c-pdf.html',39:'part0-u39-setup-pdf.html',
  40:'part0-u40-c-skeleton-pdf.html',41:'part0-u41-compile-pdf.html',42:'part0-u42-comments-indent-pdf.html',
  43:'part0-u43-flowchart-project-pdf.html',44:'part0-u44-comprehensive-quiz-pdf.html',
};

// C언어: part1~7 유닛 파일명 (유닛 번호는 파트 내에서 리셋)
const C_LANG_FILES: Record<string, string> = {
  '1-1':'part1-u01-hello-world-pdf.html','1-2':'part1-u02-c-language-pdf.html','1-3':'part1-u03-dev-env-pdf.html',
  '1-4':'part1-u04-code-structure-pdf.html','1-5':'part1-u05-semicolon-braces-pdf.html','1-6':'part1-u06-comments-pdf.html',
  '1-7':'part1-u07-indent-style-pdf.html','1-8':'part1-u08-compile-error-pdf.html','1-9':'part1-u09-runtime-error-pdf.html',
  '1-10':'part1-u10-multiline-pdf.html','1-11':'part1-u11-escape-chars-pdf.html','1-12':'part1-u12-ascii-art-1-pdf.html',
  '1-13':'part1-u13-ascii-art-2-pdf.html','1-14':'part1-u14-project-namecard-pdf.html',
  '2-1':'part2-u01-variable-intro-pdf.html','2-2':'part2-u02-variable-naming-pdf.html','2-3':'part2-u03-printf-format-pdf.html',
  '2-4':'part2-u04-scanf-input-pdf.html','2-5':'part2-u05-int-calc-pdf.html','2-6':'part2-u06-data-types-pdf.html',
  '2-7':'part2-u07-char-type-pdf.html','2-8':'part2-u08-type-casting-pdf.html','2-9':'part2-u09-const-pdf.html',
  '2-10':'part2-u10-assign-ops-pdf.html','2-11':'part2-u11-increment-pdf.html','2-12':'part2-u12-comparison-pdf.html',
  '2-13':'part2-u13-logical-ops-pdf.html','2-14':'part2-u14-operator-priority-pdf.html','2-15':'part2-u15-project-calculator-pdf.html',
  '3-1':'part3-u01-if-basic-pdf.html','3-2':'part3-u02-if-else-pdf.html','3-3':'part3-u03-else-if-pdf.html',
  '3-4':'part3-u04-nested-if-pdf.html','3-5':'part3-u05-logical-condition-pdf.html','3-6':'part3-u06-switch-pdf.html',
  '3-7':'part3-u07-project-grade-pdf.html','3-8':'part3-u08-while-basic-pdf.html','3-9':'part3-u09-for-basic-pdf.html',
  '3-10':'part3-u10-for-patterns-pdf.html','3-11':'part3-u11-do-while-pdf.html','3-12':'part3-u12-break-continue-pdf.html',
  '3-13':'part3-u13-nested-loop-pdf.html','3-14':'part3-u14-project-gugudan-pdf.html','3-15':'part3-u15-accumulator-pdf.html',
  '3-16':'part3-u16-max-min-pdf.html','3-17':'part3-u17-fizzbuzz-pdf.html','3-18':'part3-u18-project-final-pdf.html',
  '4-1':'part4-u01-function-intro-pdf.html','4-2':'part4-u02-void-function-pdf.html','4-3':'part4-u03-parameters-pdf.html',
  '4-4':'part4-u04-return-value-pdf.html','4-5':'part4-u05-scope-pdf.html','4-6':'part4-u06-project-calculator-func-pdf.html',
  '4-7':'part4-u07-recursion-pdf.html','4-8':'part4-u08-array-function-pdf.html','4-9':'part4-u09-pointer-basics-pdf.html',
  '4-10':'part4-u10-pointer-function-pdf.html','4-11':'part4-u11-array-pointer-pdf.html','4-12':'part4-u12-string-basics-pdf.html',
  '4-13':'part4-u13-string-advanced-pdf.html','4-14':'part4-u14-project-grade-manager-pdf.html',
  '5-1':'part5-u01-struct-intro-pdf.html','5-2':'part5-u02-typedef-pdf.html','5-3':'part5-u03-struct-function-pdf.html',
  '5-4':'part5-u04-struct-array-pdf.html','5-5':'part5-u05-struct-memory-pdf.html','5-6':'part5-u06-project-addressbook-pdf.html',
  '5-7':'part5-u07-enum-pdf.html','5-8':'part5-u08-union-pdf.html','5-9':'part5-u09-dynamic-memory-pdf.html',
  '5-10':'part5-u10-preprocessor-pdf.html','5-11':'part5-u11-multi-file-pdf.html','5-12':'part5-u12-file-io-basic-pdf.html',
  '5-13':'part5-u13-file-io-advanced-pdf.html','5-14':'part5-u14-project-grade-system-v2-pdf.html',
  '6-1':'part6-u01-sorting-intro-pdf.html','6-2':'part6-u02-bubble-sort-pdf.html','6-3':'part6-u03-selection-sort-pdf.html',
  '6-4':'part6-u04-insertion-sort-pdf.html','6-5':'part6-u05-qsort-stdlib-pdf.html','6-6':'part6-u06-binary-search-pdf.html',
  '6-7':'part6-u07-project-sort-visualizer-pdf.html','6-8':'part6-u08-stack-pdf.html','6-9':'part6-u09-queue-pdf.html',
  '6-10':'part6-u10-linked-list-pdf.html','6-11':'part6-u11-linked-list-advanced-pdf.html','6-12':'part6-u12-big-o-pdf.html',
  '6-13':'part6-u13-koi-problems-pdf.html','6-14':'part6-u14-project-dictionary-pdf.html',
  '7-1':'part7-u01-ternary-pdf.html','7-2':'part7-u02-bool-pdf.html','7-3':'part7-u03-bitwise-pdf.html',
  '7-4':'part7-u04-bitwise-advanced-pdf.html','7-5':'part7-u05-float-deep-pdf.html','7-6':'part7-u06-overflow-pdf.html',
  '7-7':'part7-u07-debugger-pdf.html','7-8':'part7-u08-goto-pdf.html','7-9':'part7-u09-function-pointer-pdf.html',
  '7-10':'part7-u10-function-pointer-app-pdf.html','7-11':'part7-u11-variadic-pdf.html','7-12':'part7-u12-strtok-pdf.html',
  '7-13':'part7-u13-atoi-pdf.html','7-14':'part7-u14-palindrome-pdf.html','7-15':'part7-u15-ascii-art-pdf.html',
  '7-16':'part7-u16-mini-db-pdf.html','7-17':'part7-u17-minesweeper-pdf.html','7-18':'part7-u18-final-exam-pdf.html',
};

/**
 * 코스와 유닛 인덱스(1-based)로 HTML 교재 파일 경로 반환
 * @returns `/learn/C언어/파일명` 또는 null
 */
export function getHtmlContentPath(courseId: string, unitIndex: number): string | null {
  if (courseId === '8') {
    // 컴퓨터 기초: unitIndex 1-based → part0 파일
    const file = PART0_FILES[unitIndex];
    return file ? `/learn/C언어/${file}` : null;
  }
  if (courseId === '4') {
    // C언어: unitIndex는 전체 유닛 순서 (1-based)
    // part1: 14유닛, part2: 15유닛, part3: 18유닛, part4: 14유닛, part5: 14유닛, part6: 14유닛, part7: 18유닛
    const partSizes = [14, 15, 18, 14, 14, 14, 18];
    let remaining = unitIndex;
    for (let p = 0; p < partSizes.length; p++) {
      if (remaining <= partSizes[p]) {
        const key = `${p + 1}-${remaining}`;
        const file = C_LANG_FILES[key];
        return file ? `/learn/C언어/${file}` : null;
      }
      remaining -= partSizes[p];
    }
  }
  return null;
}
