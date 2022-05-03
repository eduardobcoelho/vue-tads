import { IStateValidations, IValidationsObject } from './types';

export default {
  validations: (state: IStateValidations): IValidationsObject =>
    state.validations,
};
