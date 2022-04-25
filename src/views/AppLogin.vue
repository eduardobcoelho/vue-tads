<template>
  <div class="app-login tad-default-box">
    <h1>Login</h1>
    <h4>Selecione a opção desejada</h4>
    <div class="app-login__box">
      <AppLoginProviders
        @setErrorStatus="
          (value) => {
            loginError = value;
          }
        "
      ></AppLoginProviders>
      <n-space v-show="loginError" vertical style="margin-top: 14px">
        <n-alert type="error"> Tente novamente! </n-alert>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AppLoginProviders from '@/components/Login/AppLoginProviders.vue';

  const router = useRouter();
  let loginError = ref<boolean>(false);

  function verifyToken() {
    if (localStorage.getItem('token')) {
      router.push({ name: 'Home' });
    }
  }
  verifyToken();
</script>

<style lang="scss" scoped>
  .app-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      color: #757575;
      margin-bottom: 14px;
    }

    &__box {
      padding: 18px 14px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.5);
      min-width: 280px;
    }
  }
</style>
