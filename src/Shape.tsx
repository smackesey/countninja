// ########################
// ##### SHAPE
// ########################

import { AnimatePresence, motion } from 'framer-motion';

const SHAPE_TO_SIDES: Record<string, number> = {
  triangle: 3,
  square: 4,
  pentagon: 5,
  hexagon: 6,
  heptagon: 7,
  octagon: 8,
  nonagon: 9,
  decagon: 10,
};

const FILL_CLASSES: Record<string, string> = {
  red: 'fill-red-500',
  blue: 'fill-blue-500',
  green: 'fill-green-500',
  yellow: 'fill-yellow-500',
  indigo: 'fill-indigo-500',
  purple: 'fill-purple-500',
  pink: 'fill-pink-500',
};

export function Shape({
  shape,
  x,
  y,
  r,
  color,
  id,
}: {
  shape: string;
  x: number;
  y: number;
  r: number;
  color: string;
  id?: string;
}) {
  const className = `stroke-gray-900 stroke-[0.5] ${FILL_CLASSES[color]}`;

  let svgShape;
  if (shape === 'circle') {
    svgShape = (
      <motion.circle
        key={id}
        animate={{ opacity: 1, cx: x, cy: y }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        r={r}
        className={className}
      />
    );
  } else {
    // Amount to rotate each point around the origin
    const sides = SHAPE_TO_SIDES[shape];
    const rotation = (2 * Math.PI) / sides;

    // Generate points for the polygon
    const points = Array.from({ length: sides })
      .map((_, index) => rotation * index)
      .map((angle) => [x + r * Math.cos(angle), y + r * Math.sin(angle)]);

    svgShape = (
      <motion.polygon
        key={id}
        animate={{ opacity: 1, points: points.join(' ') }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        className={className}
      />
    );
  }
  return <AnimatePresence>{svgShape}</AnimatePresence>;
}
