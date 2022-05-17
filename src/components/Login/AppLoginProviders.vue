<template>
  <n-alert v-if="loginError" type="error" style="margin-top: 14px">
    {{ loginError }}
  </n-alert>
  <n-button
    v-for="{ provider, color } in authOptions"
    :key="provider"
    @click="signIn(provider.toLowerCase())"
    :color="color"
    class="providers-button"
  >
    <Icon size="32">
      <template v-if="provider === 'Google'">
        <LogoGoogle></LogoGoogle>
      </template>
      <template v-else>
        <LogoGithub></LogoGithub>
      </template>
    </Icon>
    <span>{{ provider }}</span>
  </n-button>
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
    store.dispatch('signIn', provider);
  }
</script>

<style lang="scss" scoped>
  .providers-button {
    width: 100%;
    padding: 24px 0;

    &:not(&:nth-child(1)) {
      margin-top: 14px;
    }
  }

  span {
    font-size: 16px;
    font-weight: 600;
    margin-left: 4px;
  }
</style>
