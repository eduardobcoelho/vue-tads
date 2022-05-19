import { INotification, IStateNotification } from '@/types';

export default {
  getNotification: (state: IStateNotification): INotification | null =>
    state.notification,
  getNotificationSuccessCadaster: (state: IStateNotification): boolean =>
    state.notificationSuccessCadaster,
};
