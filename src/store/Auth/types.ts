import {
  UserCredential,
  OAuthCredential,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

export interface IStateAuth {
  user: IUser | null;
  authProviders: IAuthProviders;
  authProvidersInstance: IAuthProvidersInstance;
}

export interface IUser {
  name: string;
  email: string;
  photoURL?: URL;
}

export interface IAuthProviders {
  google: typeof GoogleAuthProvider;
  github: typeof GithubAuthProvider;
}

export interface IAuthProvidersInstance {
  google: GoogleAuthProvider;
  github: GithubAuthProvider;
}

export interface ISigninReturn {
  result: UserCredential;
  credential: OAuthCredential | null;
}
