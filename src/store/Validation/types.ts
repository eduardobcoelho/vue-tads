import { FormItemRule } from 'naive-ui';

export interface IStateValidations {
  validations: IValidationsObject;
}

export interface IValidationsObject {
  required: FormItemRule;
  email: FormItemRule;
}

export interface ICadasterModel {
  email: string;
  password: string;
  confirmPassword: string;
}

export enum EAuthErrorsMessage {
  EMAILALREADYINUSE = 'O E-mail já está em uso',
  WEAKPASSWORD = 'Senha fraca',
}
