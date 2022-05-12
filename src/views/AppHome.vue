<template>
  <div class="app-home tad-default-box">
    <h1>Selecione o TAD</h1>
    <div>
      <tad-selector></tad-selector>
    </div>
  </div>
</template>

<script setup>
  import TadSelector from '@/components/Tad/TadSelector.vue';
</script>

<style lang="scss">
  .app-home {
    @include displayFlex(column, center, center);
  }
</style>
