<template>
  <div class="app-home tad-default-box">
    <h1>Selecione o TAD</h1>
    <div>
      <tad-selector></tad-selector>
    </div>
  </div>
</template>

<script setup>
  import TadSelector from '@/components/tad/TadSelector.vue';
</script>

<style lang="scss">
  .app-home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
