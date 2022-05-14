import { IStateValidations, IValidationsObject } from '@/types';

export default {
  getValidations: (state: IStateValidations): IValidationsObject =>
    state.validations,
};
