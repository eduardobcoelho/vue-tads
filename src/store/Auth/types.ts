import { UserCredential, OAuthCredential } from 'firebase/auth';

export interface IStateAuth {
  user: IUser | null;
}

export interface IUser {
  name: string;
  email: string;
  photoURL?: URL;
}

export interface ISigninReturn {
  result: UserCredential;
  credential: OAuthCredential | null;
}
