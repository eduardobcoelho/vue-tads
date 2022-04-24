<template>
  <div class="app-login tad-default-box">
    <h1>Login</h1>
    <h4>Selecione a opção desejada</h4>
    <div class="app-login__box">
      <n-button
        @click="signIn('Google')"
        color="#DB4437"
        style="width: 100%; padding: 24px 0"
      >
        <Icon size="32">
          <LogoGoogle></LogoGoogle>
        </Icon>
        <span>Google</span>
      </n-button>
      <n-button
        @click="signIn('Github')"
        color="#171515"
        style="width: 100%; padding: 24px 0; margin-top: 14px"
      >
        <Icon size="32">
          <LogoGithub></LogoGithub>
        </Icon>
        <span>GitHub</span>
      </n-button>
      <n-space v-show="loginError" vertical style="margin-top: 14px">
        <n-alert type="error"> Tente novamente! </n-alert>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { Icon } from '@vicons/utils';
  import { LogoGoogle, LogoGithub } from '@vicons/carbon';

  const store = useStore();
  const router = useRouter();

  let loginError = ref<boolean>(false);

  function signIn(provider: string) {
    loginError.value = false;
    store.dispatch(`signIn${provider}`).catch(() => (loginError.value = true));
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

    &__box {
      padding: 18px 14px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.5);
      min-width: 280px;
    }

    span {
      font-size: 16px;
      font-weight: bold;
      margin-left: 4px;
    }
  }
</style>
