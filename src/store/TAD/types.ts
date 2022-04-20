export interface IStateTAD {
  currentTad: ITAD | null;
  TADS: ITAD[];
}

export interface ITAD {
  name: string;
  value: string;
}
