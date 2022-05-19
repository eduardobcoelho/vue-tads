export interface IStateNotification {
  notification: INotification | null;
  notificationSuccessCadaster: boolean;
}

export interface INotification {
  type: string;
  message: string;
}
