<template>
  <div class="app-home">
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
    min-height: 100vh;
    width: 100%;
    background-color: lightblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
