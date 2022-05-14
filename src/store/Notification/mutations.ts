import { IStateNotification, INotification } from '@/types';

export default {
  setNotification(
    state: IStateNotification,
    payload: INotification | null,
  ): void {
    state.notification = payload;
  },
};
