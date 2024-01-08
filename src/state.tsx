// ########################
// ##### STATE
// ########################

import PoissonDiskSampling from 'poisson-disk-sampling';
import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { CORRECT_SOUND, playSound, VICTORY_SONG, WRONG_SOUND } from './audio';
import { KEYMAP } from './keymaps';
import { localStorageGet } from './settings';
import { randEnum, randInt, sampleWithoutReplacement, strEnum } from './utils';

export interface RoundParameters {
  number: number;
  color: string;
  shape: string;
}

const GAME_STATES = strEnum(['round-ongoing', 'round-success', 'wrong-answer', 'game-success']);
type GameState = keyof typeof GAME_STATES;

const COLORS = strEnum(['red', 'blue', 'green', 'yellow', 'indigo', 'purple', 'pink']);
export type Color = keyof typeof COLORS;

const SHAPES = strEnum([
  'circle',
  'triangle',
  'square',
  'pentagon',
  'hexagon',
  'heptagon',
  'octagon',
  'nonagon',
  'decagon',
]);
export type Shape = keyof typeof SHAPES;

// *****************************************************************************
// ***** SETTINGS **************************************************************

// break these out because they're used in multiple atoms
const MIN_NUMBER_DEFAULT = localStorageGet('minNumber', 2);
const MAX_NUMBER_DEFAULT = localStorageGet('maxNumber', 20);

export const minNumberState = atom<number>({
  key: 'minNumber',
  default: MIN_NUMBER_DEFAULT,
});

export const maxNumberState = atom<number>({
  key: 'maxNumber',
  default: MAX_NUMBER_DEFAULT,
});

export const numRoundsState = atom<number>({
  key: 'numRounds',
  default: localStorageGet('numRounds', 10),
});

export const shapeSizeState = atom<number>({
  key: 'shapeSize',
  default: localStorageGet('shapeSize', 2),
});

// ----- TRANSIENT

export const gameStateState = atom<GameState>({
  key: 'gameState',
  default: 'round-ongoing',
});

export const currentRoundState = atom<RoundParameters>({
  key: 'currentRound',
  default: generateRandomRound(MIN_NUMBER_DEFAULT, MAX_NUMBER_DEFAULT),
});

export const roundIndexState = atom<number>({
  key: 'roundIndex',
  default: 0,
});

export const completedRoundsState = atom<RoundParameters[]>({
  key: 'completedRounds',
  default: [],
});

// ----- COMPUTED

export const pointsDistributionState = selector<number[][]>({
  key: 'pointsDistribution',
  get: ({ get }) => {
    const currentRound = get(currentRoundState);

    const pds = new PoissonDiskSampling({ shape: [100, 100], minDistance: 10 });
    const points = sampleWithoutReplacement(pds.fill(), currentRound.number);
    return points;
  },
});

function generateRandomRound(minNumber: number, maxNumber: number): RoundParameters {
  return {
    number: randInt(maxNumber, minNumber),
    color: randEnum(COLORS),
    shape: randEnum(SHAPES),
    // shape: 'circle',
  };
}

export function KeyboardListener() {
  const minNumber = useRecoilValue(minNumberState);
  const maxNumber = useRecoilValue(maxNumberState);
  const [currentRound, setCurrentRound] = useRecoilState(currentRoundState);
  const [completedRounds, setCompletedRounds] = useRecoilState(completedRoundsState);
  const [roundIndex, setRoundIndex] = useRecoilState(roundIndexState);
  const [gameState, setGameState] = useRecoilState(gameStateState);
  const numRounds = useRecoilValue(numRoundsState);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keymap = KEYMAP;
      const action = keymap.get(event.key);
      if (action === 'correct') {
        if (gameState === 'round-success') {
          setCompletedRounds([...completedRounds, currentRound]);
          if (completedRounds.length + 1 === numRounds) {
            setGameState('game-success');
            playSound(VICTORY_SONG);
          } else {
            setCurrentRound(generateRandomRound(minNumber, maxNumber));
            setRoundIndex(roundIndex + 1);
            setGameState('round-ongoing');
          }
        } else {
          playSound(CORRECT_SOUND);
          setGameState('round-success');
        }
      } else if (action === 'wrong-try-again') {
        playSound(WRONG_SOUND);
        setGameState('wrong-answer');
        setTimeout(() => setGameState('round-ongoing'), 2000);
      } else if (action === 'wrong-skip') {
        playSound(WRONG_SOUND);
        setCurrentRound(generateRandomRound(minNumber, maxNumber));
      }
    };

    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    numRounds,
    completedRounds,
    currentRound,
    minNumber,
    maxNumber,
    setCurrentRound,
    setCompletedRounds,
    roundIndex,
    setRoundIndex,
    gameState,
    setGameState,
  ]);

  return null;
}
