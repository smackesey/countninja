// ########################
// ##### KEYMAPS
// ########################

export type Action = 'correct' | 'wrong-try-again' | 'wrong-skip';

export const KEYMAP = new Map([
  ['c', 'correct'],
  ['g', 'wrong-try-again'],
  ['h', 'wrong-skip'],
]);
