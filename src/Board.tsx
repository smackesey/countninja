// ########################
// ##### BOARD
// ########################

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { Shape } from './Shape';
import {
  currentRoundState,
  gameStateState,
  pointsDistributionState,
  roundIndexState,
  shapeSizeState,
} from './state';

export function Board() {
  const gameState = useRecoilValue(gameStateState);
  const roundIndex = useRecoilValue(roundIndexState);
  const roundParameters = useRecoilValue(currentRoundState);
  const shapeSize = useRecoilValue(shapeSizeState);
  const pointsDistribution = useRecoilValue(pointsDistributionState);

  const points =
    gameState === 'round-success'
      ? gridCoordinates(100, shapeSize, roundParameters.number)
      : pointsDistribution;

  const shapes = points.map(([x, y], i) => (
    <Shape
      key={i}
      x={x}
      y={y}
      r={shapeSize}
      shape={roundParameters.shape}
      color={roundParameters.color}
      id={`shape-${roundIndex}-${i}`}
    />
  ));

  return (
    <div className="bg-gray-500 h-full p-16 w-full relative">
      {gameState === 'wrong-answer' && (
        <ImageModal>
          <img alt="wrong" src="sanders-no.gif" className="h-128" />
        </ImageModal>
      )}
      {gameState === 'game-success' && (
        <ImageModal>
          <img alt="game-success" src="cat-riding-unicorn.webp" className="h-128" />
        </ImageModal>
      )}
      <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100">
        {gameState === 'round-success' && <Number number={roundParameters.number} />}
        {gameState !== 'game-success' && shapes}
      </svg>
    </div>
  );
}

function Number({ number }: { number: number }) {
  return (
    <AnimatePresence>
      <motion.text
        transition={{ duration: 1 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        x="50%"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="36"
      >
        {number}
      </motion.text>
    </AnimatePresence>
  );
}

const NUM_COLS = 6;
const GAP = 2;
const Y_START = 60;

export function gridCoordinates(width: number, size: number, n: number) {
  const numCols = Math.min(n, NUM_COLS);
  const numRows = Math.ceil(n / numCols);

  const rowWidth = size * 2 * numCols + (size - 1) * GAP;
  const xStart = (width - rowWidth) / 2;
  const yStart = Y_START;
  const xCoords = Array.from({ length: NUM_COLS }).map(
    (_, i) => xStart + i * (2 * size + GAP) + size,
  );
  const yCoords = Array.from({ length: numRows }).map((_, i) => yStart + i * (2 * size + GAP));

  const points = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (i * NUM_COLS + j < n) {
        points.push([xCoords[j], yCoords[i]]);
      }
    }
  }
  return points;
}

export function ImageModal({ children }: { children: React.ReactNode }) {
  const transform = 'translate(-50%, -50%)';
  return (
    <div
      style={{ transform: transform }}
      className="absolute p-8 top-1/2 left-1/2 bg-black rounded-lg"
    >
      {children}
    </div>
  );
}
