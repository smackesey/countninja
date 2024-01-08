// ########################
// ##### SETTINGS
// ########################

const SETTINGS_PREFIX = 'wordwizard-settings-';

function getSettingsKey(setting: string): string {
  return `${SETTINGS_PREFIX}${setting}`;
}

export function localStorageSet<T>(settingsKey: string, value: T): void {
  localStorage.setItem(getSettingsKey(settingsKey), JSON.stringify(value));
}

export function localStorageGet<T>(setting: string, defaultValue: T): T {
  const key = getSettingsKey(setting);
  const value = localStorage.getItem(key);
  return value === null ? defaultValue : JSON.parse(value);
}

export function SettingsSlider({
  settingsKey,
  label,
  value,
  setValue,
  min = 2,
  max = 10,
}: {
  settingsKey: string;
  label: string;
  value: number;
  setValue: (x: number) => void;
  min?: number;
  max?: number;
}) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    localStorageSet(settingsKey, newValue);
    setValue(newValue);
  };

  return (
    <div className="flex justify-between">
      <div>{label}</div>
      <div className="flex space-x-2 > *">
        <input
          type="range"
          min={min} // Minimum value
          max={max} // Maximum value
          value={value}
          onChange={onChange}
        />
        <div className="min-w-[1em] text-right">{value}</div>
      </div>
    </div>
  );
}
