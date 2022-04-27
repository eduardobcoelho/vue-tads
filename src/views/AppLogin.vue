<template>
  <div class="app-login tad-default-box">
    <h1>Login</h1>
    <div class="app-login__box">
      <AppLoginForm @setLoginError="setLoginError"></AppLoginForm>
      <div class="app-login__btn-or">ou</div>
      <AppLoginProviders
        @setErrorStatus="
          (value) => {
            loginError = value;
          }
        "
      ></AppLoginProviders>
      <div class="app-login__cadaster">
        Não possui uma conta?
        <span @click="router.push({ name: 'Cadaster' })">Criar conta</span>.
      </div>
      <n-space v-show="loginError" vertical style="margin-top: 14px">
        <n-alert type="error"> {{ loginError }} </n-alert>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AppLoginForm from '@/components/Login/AppLoginForm.vue';
  import AppLoginProviders from '@/components/Login/AppLoginProviders.vue';

  const router = useRouter();
  let loginError = ref<string | null>(null);

  function setLoginError(error: string) {
    loginError.value = error;
  }
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

    &__btn-or {
      font-weight: bold;
      color: #919191;
      margin-top: 14px;
    }

    &__cadaster {
      margin-top: 14px;
      font-size: 12px;

      span {
        color: blue;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__box {
      width: 100%;
      padding: 18px 14px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.5);
      min-width: 280px;
      max-width: 340px;
      margin-top: 14px;
    }
  }
</style>
