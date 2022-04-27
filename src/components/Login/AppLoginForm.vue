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

<script setup>
  import { reactive, ref, computed, defineEmits } from 'vue';
  import { useStore } from 'vuex';

  const emit = defineEmits(['setLoginError']);
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

    &__actions {
      text-align: center;
    }
  }
</style>
