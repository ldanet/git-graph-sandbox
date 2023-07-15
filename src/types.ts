export type HeadLocationType = "commit" | "branch";
export type HeadLocation = {
  type: HeadLocationType;
  id: number;
};

export type BranchObj = { id: number; name: string; hue: number };
export type CommitObj = { id: number };
export type StemObj = { id: number };
export type InitObj = { id: number };
