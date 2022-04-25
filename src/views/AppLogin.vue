<template>
  <div class="app-login tad-default-box">
    <h1>Login</h1>
    <h4>Selecione a opção desejada</h4>
    <div class="app-login__box">
      <n-button
        v-for="{ provider, color } in authOptions"
        :key="provider"
        @click="signIn(provider.toLowerCase())"
        :color="color"
        class="app-login__button"
      >
        <Icon size="32">
          <template v-if="provider === 'Google'">
            <LogoGoogle></LogoGoogle>
          </template>
          <template v-else-if="provider === 'Facebook'">
            <LogoFacebook></LogoFacebook>
          </template>
          <template v-else>
            <LogoGithub></LogoGithub>
          </template>
        </Icon>
        <span>{{ provider }}</span>
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
  import { LogoGoogle, LogoGithub, LogoFacebook } from '@vicons/carbon';

  const store = useStore();
  const router = useRouter();

  let loginError = ref<boolean>(false);

  const authOptions: { provider: string; color: string } = [
    { provider: 'Google', color: '#DB4437' },
    { provider: 'Facebook', color: '#4267B2' },
    { provider: 'Github', color: '#171515' },
  ];

  function signIn(provider: string) {
    loginError.value = false;
    store.dispatch('signIn', provider).catch(() => (loginError.value = true));
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

    &__button {
      width: 100%;
      padding: 24px 0;

      &:not(&:nth-child(1)) {
        margin-top: 14px;
      }
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
