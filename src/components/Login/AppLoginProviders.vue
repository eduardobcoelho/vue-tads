<template>
  <n-alert v-if="loginError" type="error" style="margin-top: 14px">
    {{ loginError }}
  </n-alert>
  <div class="login-providers">
    <div
      v-for="{ provider, color } in authOptions"
      :key="provider"
      class="login-providers__button"
    >
      <n-button
        tertiary
        circle
        :color="color"
        @click="signIn(provider.toLowerCase())"
      >
        <Icon size="32">
          <template v-if="provider === 'Google'">
            <LogoGoogle></LogoGoogle>
          </template>
          <template v-else>
            <LogoGithub></LogoGithub>
          </template>
        </Icon>
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import { Icon } from '@vicons/utils';
  import { LogoGoogle, LogoGithub } from '@vicons/carbon';

  const store = useStore();

  const authOptions = [
    { provider: 'Google', color: '#DB4437' },
    { provider: 'Github', color: '#171515' },
  ];

  const loginError = ref<string | null>(null);
  onMounted(() => {
    store
      .dispatch('redirectResult')
      .catch((error) => (loginError.value = error));
  });

  function signIn(provider: string) {
    loginError.value = null;
    store.dispatch('signInProvider', provider);
  }
</script>

<style lang="scss" scoped>
  .login-providers {
    margin-top: 14px;

    &__button {
      display: inline-flex;

      &:not(&:first-child) {
        margin-left: 8px;
      }
    }
  }

  span {
    font-size: 16px;
    font-weight: 600;
    margin-left: 4px;
  }
</style>
