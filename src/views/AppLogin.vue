<template>
  <div class="app-login tad-default-box">
    <h1>Login</h1>
    <div class="app-login__box">
      <n-alert
        v-show="notificationSuccessCadaster"
        closable
        type="success"
        style="margin-bottom: 14px"
        @on-close="setNotificationSuccessCadasterFalse(0)"
      >
        Usuário cadastrado com sucesso!
      </n-alert>
      <AppLoginForm></AppLoginForm>
      <div class="app-login__btn-or">ou</div>
      <AppLoginProviders></AppLoginProviders>
      <div class="app-login__cadaster">
        Não possui uma conta?
        <span @click="router.push({ name: 'Cadaster' })">Criar conta</span>.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onDeactivated } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import AppLoginForm from '@/components/Login/AppLoginForm.vue';
  import AppLoginProviders from '@/components/Login/AppLoginProviders.vue';

  const store = useStore();
  const router = useRouter();

  const notificationSuccessCadaster = computed<boolean>(
    () => store.getters.getNotificationSuccessCadaster,
  );

  const debounce = ref<number | null>(null);
  function setNotificationSuccessCadasterFalse(time: number): void {
    if (notificationSuccessCadaster.value) {
      clearDebounce();
      debounce.value = window.setTimeout(() => {
        store.commit('setNotificationSuccessCadaster', false);
      }, time);
    }
  }
  function clearDebounce(): void {
    if (debounce.value) clearTimeout(debounce.value);
  }
  function verifyToken(): void {
    if (localStorage.getItem('token')) {
      router.push({ name: 'Home' });
    }
  }
  verifyToken();
  setNotificationSuccessCadasterFalse(4000);
  onDeactivated(() => clearDebounce());
</script>

<style lang="scss" scoped>
  .app-login {
    @include displayFlex(column, center, center);

    h4 {
      color: $grey;
      margin-bottom: 14px;
    }

    &__btn-or {
      font-weight: bold;
      color: $light-grey;
      margin-top: 14px;
    }

    &__cadaster {
      margin-top: 14px;
      font-size: 12px;

      span {
        color: $blue;
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
