export interface IStateNotification {
  notification: INotification | null;
}

export interface INotification {
  type: string;
  message: string;
}
