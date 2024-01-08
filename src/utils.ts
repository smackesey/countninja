// ########################
// ##### UTILS
// ########################

// Use like this to get a literal enum available to both runtime and compile time:
//
//   myEnum = strEnum(['foo', 'bar']);
//   type MyEnum = keyof typeof myEnum;
export function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export function randEnum(obj: Record<string, string>): string {
  const keys = Object.keys(obj) as Array<keyof typeof obj>;
  return obj[keys[Math.floor(Math.random() * keys.length)]];
}

export function randInt(max: number, min?: number) {
  min = min || 1;
  const scaleFactor = max - min + 1;
  return Math.floor(Math.random() * scaleFactor) + min;
}

export function sampleWithoutReplacement<T>(array: T[], n: number): T[] {
  let m = array.length,
    t,
    i;

  // Shuffle the array using Fisher-Yates
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  // Return first N elements
  return array.slice(0, n);
}
