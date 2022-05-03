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
      ></n-input>
    </n-form-item>
    <n-form-item label="Senha" path="password" label-style="font-weight: bold;">
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        "
      >
        <n-input
          type="password"
          v-model:value="model.password"
          placeholder="Digite aqui..."
          show-password-on="click"
        ></n-input>
        <span
          @click="router.push({ name: 'ForgotPassword' })"
          class="app-login-form__forgot-password"
        >
          Esqueci minha senha
        </span>
      </div>
    </n-form-item>
    <div class="app-login-form__actions">
      <n-button @click="submitForm" color="black" type="primary">
        Entrar
      </n-button>
    </div>
  </n-form>
</template>

<script setup>
  import { reactive, ref, computed, defineEmits } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  const emit = defineEmits(['setLoginError']);
  const router = useRouter();
  const store = useStore();

  const loginForm = ref(null);
  const model = reactive({
    email: '',
    password: '',
  });
  const validations = computed(() => store.getters.validations);
  const rules = {
    email: [validations.value.email, validations.value.required],
    password: validations.value.required,
  };
  function submitForm() {
    emit('setLoginError', null);
    loginForm.value?.validate((errors) => {
      if (!errors) {
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
          .catch((error) => emit('setLoginError', error));
      }
    });
  }
</script>

<style lang="scss" scoped>
  .app-login-form {
    text-align: start;

    &__forgot-password {
      font-size: 12px;
      color: blue;
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
