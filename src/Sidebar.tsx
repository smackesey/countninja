// ########################
// ##### SIDEBAR
// ########################

import { useRecoilState, useRecoilValue } from 'recoil';
import { SettingsSlider } from './settings';
import { Shape } from './Shape';
import {
  completedRoundsState,
  maxNumberState,
  minNumberState,
  RoundParameters,
  shapeSizeState,
  numRoundsState,
} from './state';

export function Sidebar() {
  const [minNumber, setMinNumber] = useRecoilState(minNumberState);
  const [maxNumber, setMaxNumber] = useRecoilState(maxNumberState);
  const [numRounds, setNumRounds] = useRecoilState(numRoundsState);
  const completedRounds = useRecoilValue(completedRoundsState);
  const [shapeSize, setShapeSize] = useRecoilState(shapeSizeState);

  return (
    <div className="bg-gray-300 p-2 w-1/4 flex flex-col">
      <div className="flex flex-col space-y-2 > *">
        {Array.from({ length: numRounds }).map((_, i) => (
          <Tile key={i}>
            {completedRounds[i] && <CompletedRoundCard round={completedRounds[i]} />}
          </Tile>
        ))}
      </div>
      <div className="h-0 flex-grow"></div>
      <div className="flex flex-col mt-2">
        <SettingsSlider
          settingsKey="numRounds"
          label="# Rounds"
          value={numRounds}
          setValue={setNumRounds}
          min={3}
          max={10}
        />
        <SettingsSlider
          settingsKey="minNumber"
          label="Min number"
          value={minNumber}
          setValue={setMinNumber}
          min={2}
          max={10}
        />
        <SettingsSlider
          settingsKey="maxNumber"
          label="Max number"
          value={maxNumber}
          setValue={setMaxNumber}
          min={5}
          max={20}
        />
        <SettingsSlider
          settingsKey="shapeSize"
          label="Shape size"
          value={shapeSize}
          setValue={setShapeSize}
          min={1}
          max={5}
        />
      </div>
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return <div className={`h-16 border-2 border-black rounded-lg`}>{children}</div>;
}

function CompletedRoundCard({ round }: { round: RoundParameters }) {
  return (
    <div
      className={`p-1 h-full justify-center items-center flex space-x-3 > * bg-gray-500 rounded-lg animate-fade-in`}
    >
      <div className="w-8 text-center text-4xl">{round.number}</div>
      <svg className="w-12" viewBox="0 0 10 10">
        <Shape x={5} y={5} r={4} shape={round.shape} color={round.color} />
      </svg>
    </div>
  );
}
