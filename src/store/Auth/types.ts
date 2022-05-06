import { UserCredential, OAuthCredential } from 'firebase/auth';

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

export enum EAuthErrorsMessage {
  EMAILALREADYINUSE = 'O E-mail já está em uso',
  INVALIDEMAIL = 'E-mail inválido',
  USERDISABLED = 'Este usuário foi desabilitado',
  USERNOTFOUND = 'Usuário não encontrado',
  WRONGPASSWORD = 'Senha incorreta',
  WEAKPASSWORD = 'Senha fraca',
}
