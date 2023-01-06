import { BaseGetManyResponseModel } from "@data/models/response/base-get-many-response";
import { generateEntries } from "./generate-entries";
import { EntryType } from "./types/get-many-entry-type";

export function generateGetMany<T extends EntryType = any>(
  mockedResponse: BaseGetManyResponseModel<T>,
  n: number,
  totalEntries?: number,
): BaseGetManyResponseModel<T> {
  if (mockedResponse.data) {
    const entries = generateEntries<T>(mockedResponse.data.entries, n);
    return {
      data: {
        ...mockedResponse.data,
        entries,
        totalEntries: totalEntries ?? entries.length,
      },
    };
  }

  return mockedResponse;
}
