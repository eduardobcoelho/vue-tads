<template>
  <component :is="currentTadComponentName"></component>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  let currentTadComponentName = computed<string>(
    () => store.getters.currentTad.component,
  );
</script>
