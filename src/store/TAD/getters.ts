import { IStateTAD, ITAD } from '@/types';

export default {
  currentTad: (state: IStateTAD): ITAD | null => state.currentTad,
  TADS: (state: IStateTAD): ITAD[] => state.TADS,
};
