import { computed } from 'vue';
import { FormItemRule } from 'naive-ui';
import { IValidationsObject } from '@/types';
import store from '@/store';

const allValidations = computed<IValidationsObject>(
  () => store.getters.getValidations,
);

export function useValidations(...validations: string[]): FormItemRule[] {
  const validationsArray: FormItemRule[] = [];
  validations.map((item) => {
    switch (item) {
      case 'required':
        validationsArray.push(allValidations.value.required);
        break;
      case 'email':
        validationsArray.push(allValidations.value.email);
    }
  });
  return validationsArray;
}
