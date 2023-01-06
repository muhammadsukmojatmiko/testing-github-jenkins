import { REGION_LEVEL_TYPE } from "../types/region-level-type";

export type Location = {
  id: string;
  parentId: string;
  name: string;
  level: REGION_LEVEL_TYPE;
};
