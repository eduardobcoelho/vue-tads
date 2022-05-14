import { IStateAuth, IUser } from '@/types';

export default {
  getUser: (state: IStateAuth): IUser | null => state.user,
};
