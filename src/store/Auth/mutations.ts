import { IStateAuth, IUser } from '@/types';

export default {
  setUser(state: IStateAuth, payload: IUser | null): void {
    state.user = payload;
  },
};
