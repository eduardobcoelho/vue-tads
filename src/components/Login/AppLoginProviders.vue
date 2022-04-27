<template>
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
  import { defineEmits, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { Icon } from '@vicons/utils';
  import { LogoGoogle, LogoGithub } from '@vicons/carbon';

  const emit = defineEmits(['setErrorStatus']);
  const store = useStore();

  const authOptions = [
    { provider: 'Google', color: '#DB4437' },
    { provider: 'Github', color: '#171515' },
  ];

  onMounted(() => {
    store.dispatch('redirectResult').catch(() => emit('setErrorStatus', true));
  });

  function signIn(provider: string) {
    emit('setErrorStatus', false);
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
