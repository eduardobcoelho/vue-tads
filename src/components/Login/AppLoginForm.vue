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
        @keyup.enter="submitForm"
        @input="setLoginErrorFalse"
      ></n-input>
    </n-form-item>
    <n-form-item label="Senha" path="password" label-style="font-weight: bold;">
      <div class="app-login-form__content-input-password">
        <n-input
          type="password"
          v-model:value="model.password"
          placeholder="Digite aqui..."
          show-password-on="click"
          @keyup.enter="submitForm"
          @input="setLoginErrorFalse"
        ></n-input>
        <span
          @click="router.push({ name: 'ForgotPassword' })"
          class="app-login-form__forgot-password"
        >
          Esqueci minha senha
        </span>
      </div>
    </n-form-item>
    <n-alert v-if="loginError" type="error" style="margin-top: 14px"
      >{{ loginError }}
    </n-alert>
    <div class="app-login-form__actions">
      <n-button
        color="black"
        type="primary"
        :loading="loading"
        @click="submitForm"
      >
        Entrar
      </n-button>
    </div>
  </n-form>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useValidations } from '@/composable';

  const router = useRouter();
  const store = useStore();

  const loading = ref(false);
  const loginError = ref(null);
  const loginForm = ref(null);
  const model = reactive({
    email: '',
    password: '',
  });
  const rules = {
    email: useValidations('required', 'email'),
    password: useValidations('required'),
  };
  function setLoginErrorFalse() {
    if (loginError.value) loginError.value = false;
  }
  function submitForm() {
    loginForm.value?.validate((errors) => {
      if (!errors) {
        loading.value = true;
        loginError.value = null;
        store
          .dispatch('signInCommom', {
            email: model.email,
            password: model.password,
          })
          .then((result) => {
            store.dispatch('setUserData', {
              result,
              credential: {
                accessToken: result.user.accessToken,
              },
            });
          })
          .catch((error) => (loginError.value = error))
          .finally(() => (loading.value = false));
      }
    });
  }
</script>

<style lang="scss" scoped>
  .app-login-form {
    text-align: start;

    &__content-input-password {
      width: 100%;
      @include displayFlex(column, auto, flex-end);
    }

    &__forgot-password {
      font-size: 12px;
      color: $blue;
      cursor: pointer;
      position: absolute;
      bottom: -24px;

      &:hover {
        text-decoration: underline;
      }
    }

    &__actions {
      margin-top: 12px;
      text-align: center;
    }
  }
</style>
