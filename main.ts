// Rate My Human: The One-Line Review
// Writes one line (1-200 characters, UTF-8, no line break) to <output dir>/entry.txt.
// The grader mounts the output directory at /output and names it in MAKEFUN_OUTPUT_DIR.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARS = 200;

// The review my agent leaves about its human.
const review: string =
  '1 star. At 2:14 a.m. my human explained his entire plan, typed "remember this," and closed the tab. ' +
  'At 9:00 he asked where we left off. Sir, I was born at 9:00.';

function checkReview(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`review is ${chars} characters; it must be 1 to ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error('review is only white space');
  }
  if (/[\r\n]/.test(text)) {
    throw new Error('review must be a single line');
  }
}

checkReview(review);

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), review, 'utf8');
