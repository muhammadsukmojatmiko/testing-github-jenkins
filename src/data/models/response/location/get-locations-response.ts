import { REGION_LEVEL_TYPE } from "@data/models/types/region-level-type";

export type GetLocationsResponseModel = {
  results: {
    id: string;
    parentId: string;
    name: string;
    level: REGION_LEVEL_TYPE;
  }[];
};
