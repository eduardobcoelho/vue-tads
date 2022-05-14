import { IStateAuth, IUser } from '@/types';

export default {
  user: (state: IStateAuth): IUser | null => state.user,
};
