<template>
  <div>
    <h3>Primeiro, digite seu E-mail!</h3>
    <n-form
      ref="forgotPasswordEmailForm"
      :model="model"
      :rules="rules"
      style="text-align: start"
    >
      <n-form-item :show-label="false" path="email">
        <n-input
          type="email"
          v-model:value="model.email"
          placeholder="Digite aqui..."
          @input="resetLoginError"
        ></n-input>
      </n-form-item>
    </n-form>
    <n-alert v-show="loginError" type="error" style="margin-bottom: 14px">
      {{ loginError }}
    </n-alert>
    <div @click="submitForm" style="text-align: center; margin-top: 4px">
      <n-button tertiary type="primary" :loading="loading">Avançar</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineEmits } from 'vue';
  import { useStore } from 'vuex';
  import { FormInst } from 'naive-ui';
  import { useValidations } from '@/composable';

  const store = useStore();
  const emit = defineEmits(['setStep']);

  const loading = ref<boolean>(false);
  const loginError = ref<string | null>(null);
  const forgotPasswordEmailForm = ref<FormInst | null>(null);
  const model = reactive({
    email: '',
  });
  const rules = {
    email: useValidations('required', 'email'),
  };
  function resetLoginError() {
    if (loginError.value) loginError.value = null;
  }
  function submitForm() {
    forgotPasswordEmailForm.value?.validate((errors) => {
      if (!errors) {
        resetLoginError();
        loading.value = true;
        store
          .dispatch('sendEmailToResetPassword', model.email)
          .then(() => emit('setStep', 2))
          .catch((error) => (loginError.value = error))
          .finally(() => (loading.value = false));
      }
    });
  }
</script>

<style lang="scss" scoped>
  h3 {
    margin-bottom: 14px;
    color: $grey;
  }
</style>
