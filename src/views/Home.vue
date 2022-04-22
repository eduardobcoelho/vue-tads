<template>
  <div class="app-home tad-default-box">
    <h1>Selecione o TAD</h1>
    <div>
      <tad-selector></tad-selector>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TadSelector from '@/components/tad/TadSelector.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      TadSelector,
    },
  });
</script>

<style lang="scss">
  .app-home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
