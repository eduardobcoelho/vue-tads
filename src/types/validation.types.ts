import { FormItemRule } from 'naive-ui';

export interface IStateValidations {
  validations: IValidationsObject;
}

export interface IValidationsObject {
  required: FormItemRule;
  email: FormItemRule;
}
