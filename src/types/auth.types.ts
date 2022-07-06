import { UserCredential, OAuthCredential, User } from 'firebase/auth';

interface IAccessToken {
  accessToken: string;
}

export interface IStateAuth {
  user: IUser | null;
}

export interface IUser {
  uid: string;
  name: string | null;
  email: string;
  photoURL?: string | null;
}

export interface ISigninReturn {
  result: UserCredential;
  credential: OAuthCredential | IAccessToken | null;
}

export interface ICadasterModel {
  email: string;
  password: string;
  confirmPassword: string;
}
