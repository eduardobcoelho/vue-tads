import { IStateTAD, ITAD } from '@/types';

export default {
  getCurrentTad: (state: IStateTAD): ITAD | null => state.currentTad,
  getTADS: (state: IStateTAD): ITAD[] => state.TADS,
};
