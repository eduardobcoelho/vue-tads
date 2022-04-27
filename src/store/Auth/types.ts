import { UserCredential, OAuthCredential } from 'firebase/auth';

export interface IStateAuth {
  user: IUser | null;
}

export interface IUser {
  name: string | null;
  email: string;
  photoURL?: URL | null;
}

interface IAccessToken {
  accessToken: string;
}

export interface ISigninReturn {
  result: UserCredential;
  credential: OAuthCredential | IAccessToken | null;
}
