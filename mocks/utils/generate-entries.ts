import { EntryType } from "./types/get-many-entry-type";

export function generateEntries<T extends EntryType = any>(
  mockedEntries: T[],
  n: number,
): T[] {
  let res: T[] = [];
  for (let i = 0; i < n; i++) {
    res = [
      ...res,
      ...mockedEntries.map((e) => ({
        ...e,
        id: e.id + Math.random().toString(),
      })),
    ];
  }
  return res;
}
