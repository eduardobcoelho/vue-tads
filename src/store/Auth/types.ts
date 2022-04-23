export interface IStateAuth {
  user: IUser | null;
}

export interface IUser {
  name: string;
  email: string;
  photo?: URL;
}
