<template>
  <n-form
    ref="loginForm"
    size="medium"
    :model="model"
    :rules="rules"
    class="app-login-form"
  >
    <n-form-item label="Email" path="email" label-style="font-weight: bold;">
      <n-input
        type="email"
        v-model:value="model.email"
        placeholder="Digite aqui..."
        :rule="[rules.email]"
      ></n-input>
    </n-form-item>
    <n-form-item label="Senha" path="password" label-style="font-weight: bold;">
      <n-input
        type="password"
        v-model:value="model.password"
        placeholder="Digite aqui..."
        show-password-on="click"
      ></n-input>
    </n-form-item>
    <div class="app-login-form__actions">
      <n-button @click="submitForm" color="black" type="primary">
        Entrar
      </n-button>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInst } from 'naive-ui';

  interface loginModel {
    email: string;
    password: string;
  }
  const loginForm = ref<FormInst | null>(null);
  const model = reactive<loginModel>({
    email: '',
    password: '',
  });
  const rules = {
    email: [
      {
        required: true,
        message: 'Campo obrigatório!',
        trigger: ['input', 'blur'],
      },
      {
        type: 'email',
        message: 'E-mail inválido!',
        trigger: ['blur', 'input'],
      },
    ],
    password: {
      required: true,
      message: 'Campo obrigatório!',
      trigger: ['input', 'blur'],
    },
  };
  function submitForm() {
    loginForm.value?.validate((errors) => {
      console.log('errors: ', errors);
    });
  }
</script>

<style lang="scss" scoped>
  .app-login-form {
    text-align: start;

    &__actions {
      text-align: center;
    }
  }
</style>
