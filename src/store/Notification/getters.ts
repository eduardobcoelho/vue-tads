import { INotification, IStateNotification } from '@/types';

export default {
  notification: (state: IStateNotification): INotification | null =>
    state.notification,
};
