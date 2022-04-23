<template>
  <div class="app-login tad-default-box">
    <h1>Login</h1>
    <div class="app-login__box">
      <n-button
        @click="signIn"
        color="#DB4437"
        style="width: 100%; padding: 24px 0"
      >
        <Icon size="32">
          <LogoGoogle></LogoGoogle>
        </Icon>
        <span>Google</span>
      </n-button>
      <n-space v-show="loginError" vertical style="margin-top: 14px">
        <n-alert type="error"> Tente novamente! </n-alert>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { GoogleProvider } from '@/plugins/firebase';
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    OAuthCredentialOptions,
  } from 'firebase/auth';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { Icon } from '@vicons/utils';
  import { LogoGoogle } from '@vicons/carbon';

  const auth = getAuth();
  const store = useStore();
  const router = useRouter();

  let loginError = ref<boolean>(false);

  function verifyToken() {
    if (localStorage.getItem('token')) {
      router.push({ name: 'Home' });
    }
  }

  function signIn() {
    loginError.value = false;
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const { accessToken }: OAuthCredentialOptions | null =
          GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL } = result.user;
        store.commit('setUser', {
          name: displayName,
          email,
          photoURL,
        });
        localStorage.setItem('token', accessToken);
        router.push({ name: 'Home' });
      })
      .catch(() => (loginError.value = true));
  }

  verifyToken();
</script>

<style lang="scss" scoped>
  .app-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #63e2b7;

    h1 {
      margin-bottom: 16px;
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
