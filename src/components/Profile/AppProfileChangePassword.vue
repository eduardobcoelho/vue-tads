<template>
  <n-form ref="changePasswordForm" :model="model" :rules="rules">
    <n-form-item label="Nova senha" path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        placeholder="Digite aqui..."
        show-password-on="click"
      />
    </n-form-item>
    <n-form-item label="Confirmar senha" path="passwordConfirm">
      <n-input
        v-model:value="model.passwordConfirm"
        type="password"
        placeholder="Digite aqui..."
        show-password-on="click"
      />
    </n-form-item>
    <n-alert v-if="differentPasswords" type="error" style="margin-bottom: 14px">
      As senhas estão diferentes!
    </n-alert>
    <n-alert v-if="error" type="error" style="margin-bottom: 14px">
      {{ error }}
    </n-alert>
    <div id="change-password-form-actions">
      <div>
        <n-button tertiary type="error" @click="closeDrawer"> Fechar </n-button>
      </div>
      <div>
        <n-button
          tertiary
          type="primary"
          :disabled="differentPasswords"
          :loading="loading"
          @click="submitForm"
        >
          Salvar alterações
        </n-button>
      </div>
    </div>
  </n-form>
</template>

<script setup lang="ts">
  import { ref, reactive, defineEmits, computed } from 'vue';
  import { useStore } from 'vuex';
  import { FormInst } from 'naive-ui';
  import { useValidations } from '@/composable';

  const store = useStore();
  const emit = defineEmits(['closeDrawer']);
  const error = ref<string>('');
  const loading = ref<boolean>(false);
  const changePasswordForm = ref<FormInst | null>(null);
  const model = reactive({
    password: '',
    passwordConfirm: '',
  });
  const differentPasswords = computed<boolean>(() => {
    if (!model.password || !model.passwordConfirm) return false;
    return model.password != model.passwordConfirm;
  });
  const rules = {
    password: useValidations('required'),
    passwordConfirm: useValidations('required'),
  };
  function closeDrawer() {
    emit('closeDrawer');
  }
  function submitForm() {
    error.value = '';
    changePasswordForm.value?.validate((errors) => {
      if (!errors) {
        loading.value = true;
        store
          .dispatch('updateUserPassword', model.password)
          .then(() => closeDrawer())
          .catch((errorMessage: string) => (error.value = errorMessage))
          .finally(() => (loading.value = false));
      }
    });
  }
</script>

<style lang="scss" scoped>
  #change-password-form-actions {
    width: 100%;
    margin-top: 14px;
    @include displayFlex(row, flex-end, center);

    div {
      &:first-child {
        margin-right: 14px;
      }
    }
  }
</style>
