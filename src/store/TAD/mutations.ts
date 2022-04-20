import { ITAD, IStateTAD } from './types';

export default {
  setCurrentTad(state: IStateTAD, payload: ITAD): void {
    state.currentTad = payload;
  },
};
